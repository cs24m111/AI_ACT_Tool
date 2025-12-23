from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app import db
from app.models import ComplianceCheck, Evidence
from app.services.scraper import scrape_url
from app.services.metadata_checker import check_metadata
from app.services.label_checker import check_labels
from app.services.label_checker import check_image_label_from_url
from app.services.scoring import calculate_score, get_failed_checks
from app.services.ai_suggester import generate_suggestions

api_bp = Blueprint('api', __name__)

@api_bp.route('/validate', methods=['POST'])
def validate_compliance():
    """
    Main validation endpoint
    Accepts questionnaire JSON and returns compliance report
    """
    try:
        data = request.get_json()

        # Extract data
        company_name = data.get('company_name', 'Unknown')
        questionnaire = data.get('questionnaire', {})

        # Step 1: Validate user answers
        validation_errors = []
        if not questionnaire:
            validation_errors.append('Questionnaire data is required')

        # Step 2: Process sample URLs if provided
        evidence_list = []
        url_checks = {}

        sample_urls = data.get('sample_urls', [])
        # print("Sample Urls", sample_urls)
        # print("QUestionnaire", questionnaire)
        for url in sample_urls:
            try:
                # Scrape URL
                scraped_data = scrape_url(url)

                # Check metadata
                metadata_result = check_metadata(scraped_data)

                # print(1)
                # Check labels (placeholder)
                label_result = check_labels(scraped_data,url)
                # print("label check \n\n",label_result)

                url_checks[url] = {
                    'metadata': metadata_result,
                    'labels': label_result,
                    'scraped_data': scraped_data
                }

                # Store evidence
                evidence_list.append({
                    'url': url,
                    'type': 'url_check',
                    'metadata': metadata_result,
                    'labels': label_result
                })

            except Exception as e:
                url_checks[url] = {'error': str(e)}
                evidence_list.append({
                    'url': url,
                    'type': 'error',
                    'message': str(e)
                })

        # Step 3: Check policy page if provided
        policy_url = data.get('policy_url')
        # print("policy url",policy_url)
        policy_check = None
        if policy_url:
            try:
                policy_data = scrape_url(policy_url)
                # print("policy data",policy_data['text'])
                policy_check = check_policy_keywords(policy_data.get('text', ''))
                evidence_list.append({
                    'url': policy_url,
                    'type': 'policy_check',
                    'result': policy_check
                })
            except Exception as e:
                policy_check = {'error': str(e)}

        # Step 4: Calculate compliance score
        score_data = calculate_score(questionnaire, url_checks, policy_check)

        # Step 5: Get failed checks
        print("Url checkes : ",url_checks)
        failed_checks = get_failed_checks(questionnaire, url_checks, policy_check)

        # Step 6: Generate AI suggestions
        # print("Policy checks : ",policy_check)
        # print("url checks : ",url_checks)
        suggestions = generate_suggestions(failed_checks, questionnaire,policy_check,url_checks,sample_urls[0])

        # Step 7: Build validation result
        validation_result = {
            'score': score_data['score'],
            'passed': score_data['passed'],
            'total_checks': score_data['total_checks'],
            'passed_checks': score_data['passed_checks'],
            'failed_checks': failed_checks,
            'suggestions': suggestions,
            'evidence': evidence_list,
            'url_checks': url_checks,
            'policy_check': policy_check
        }

        # Step 8: Store in MongoDB
        check_doc = ComplianceCheck.create(company_name, questionnaire, validation_result)
        result = db.compliance_checks.insert_one(check_doc)
        check_id = str(result.inserted_id)

        # Store evidence records
        for evidence in evidence_list:
            evidence_doc = Evidence.create(check_id, evidence.get('type'), evidence)
            db.evidence.insert_one(evidence_doc)

        validation_result['check_id'] = check_id

        return jsonify({
            'success': True,
            'data': validation_result
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@api_bp.route('/checks/<check_id>', methods=['GET'])
def get_check(check_id):
    """Retrieve a specific compliance check"""
    try:
        check = db.compliance_checks.find_one({'_id': ObjectId(check_id)})
        if not check:
            return jsonify({'error': 'Check not found'}), 404

        return jsonify({
            'success': True,
            'data': ComplianceCheck.to_dict(check)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_bp.route('/checks', methods=['GET'])
def list_checks():
    """List all compliance checks"""
    try:
        checks = list(db.compliance_checks.find().sort('created_at', -1).limit(50))
        return jsonify({
            'success': True,
            'data': [ComplianceCheck.to_dict(c) for c in checks]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_bp.route('/evidence/<check_id>', methods=['GET'])
def get_evidence(check_id):
    """Get evidence for a specific check"""
    try:
        evidence = list(db.evidence.find({'check_id': check_id}))
        return jsonify({
            'success': True,
            'data': [Evidence.to_dict(e) for e in evidence]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_bp.route('/check_image_label', methods=['POST'])
def check_image_label_endpoint():
    """Accepts JSON {'image_url': '<url>'} and returns image label analysis."""
    try:
        data = request.get_json() or {}
        image_url = data.get('image_url')
        if not image_url:
            return jsonify({'success': False, 'error': 'image_url required'}), 400

        result = check_image_label_from_url(image_url)
        return jsonify({'success': True, 'data': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


def check_policy_keywords(text):
    """
    Scan policy text for required keywords
    """
    required_keywords = [
        'synthetic content',
        'ai-generated',
        'disclosure',
        'labeling',
        'transparency'
    ]

    text_lower = text.lower()
    found_keywords = []
    missing_keywords = []

    for keyword in required_keywords:
        if keyword in text_lower:
            found_keywords.append(keyword)
        else:
            missing_keywords.append(keyword)

    return {
        'compliant': len(missing_keywords) == 0,
        'found_keywords': found_keywords,
        'missing_keywords': missing_keywords,
        'score': (len(found_keywords) / len(required_keywords)) * 100
    }
