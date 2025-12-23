def calculate_score(questionnaire, url_checks, policy_check):
    """
    Calculate overall compliance score based on questionnaire and validation results

    Scoring breakdown:
    - Questionnaire answers: 40%
    - URL metadata checks: 30%
    - Visible labels: 20%
    - Policy page: 10%
    """
    total_score = 0
    max_score = 100

    # Score questionnaire (40 points)
    questionnaire_score = score_questionnaire(questionnaire)
    total_score += questionnaire_score

    # Score URL checks (50 points: 30 for metadata, 20 for labels)
    if url_checks:
        url_score = score_url_checks(url_checks)
        total_score += url_score

    # Score policy check (10 points)
    if policy_check and not policy_check.get('error'):
        policy_score = policy_check.get('score', 0) * 0.1
        total_score += policy_score

    passed_checks = count_passed_checks(questionnaire, url_checks, policy_check)
    total_checks = count_total_checks(questionnaire, url_checks, policy_check)

    # Prepare breakdown components
    metadata_component = score_metadata_checks(url_checks)
    labels_component = score_label_checks(url_checks)
    policy_component = policy_check.get('score', 0) * 0.1 if policy_check else 0

    # If questionnaire is not provided, rescale automated checks (metadata+labels+policy)
    questionnaire_present = bool(questionnaire and any(v is not None for v in questionnaire.values()))
    if not questionnaire_present:
        # raw total possible from automated checks = 60 (30 metadata + 20 labels + 10 policy)
        raw_total_possible = 60.0
        raw_score = metadata_component + labels_component + policy_component
        scale = (100.0 / raw_total_possible) if raw_total_possible > 0 else 1.0
        total_score = raw_score * scale

        breakdown = {
            'questionnaire': 0,
            'metadata': round(metadata_component * scale, 2),
            'labels': round(labels_component * scale, 2),
            'policy': round(policy_component * scale, 2)
        }
    else:
        breakdown = {
            'questionnaire': questionnaire_score,
            'metadata': metadata_component,
            'labels': labels_component,
            'policy': policy_component
        }

    return {
        'score': round(total_score, 2),
        'max_score': max_score,
        'passed': total_score >= 80,
        'passed_checks': passed_checks,
        'total_checks': total_checks,
        'breakdown': breakdown
    }


def score_questionnaire(questionnaire):
    """
    Score based on questionnaire answers
    8 questions, each worth 5 points (40 total)
    """
    score = 0
    questions = [
        'has_synthetic_content',
        'has_disclosure_policy',
        'labels_on_content',
        'metadata_embedded',
        'user_notification',
        'content_tracking',
        'regular_audits',
        'staff_training'
    ]

    for q in questions:
        if questionnaire.get(q) == True or questionnaire.get(q) == 'yes':
            score += 5

    return score


def score_url_checks(url_checks):
    """Score URL checks (metadata + labels)"""
    if not url_checks:
        return 0

    metadata_score = score_metadata_checks(url_checks)
    label_score = score_label_checks(url_checks)

    return metadata_score + label_score


def score_metadata_checks(url_checks):
    """Score metadata checks (30 points)"""
    if not url_checks:
        return 0

    total_urls = len(url_checks)
    compliant_urls = 0

    for url, check in url_checks.items():
        if check.get('metadata', {}).get('compliant'):
            compliant_urls += 1

    return (compliant_urls / total_urls) * 30 if total_urls > 0 else 0


def score_label_checks(url_checks):
    """Score label checks (20 points)"""
    if not url_checks:
        return 0

    total_urls = len(url_checks)
    compliant_urls = 0

    for url, check in url_checks.items():
        if check.get('labels', {}).get('compliant'):
            compliant_urls += 1

    return (compliant_urls / total_urls) * 20 if total_urls > 0 else 0


def count_passed_checks(questionnaire, url_checks, policy_check):
    """Count number of passed checks"""
    passed = 0

    # Questionnaire checks (only if provided)
    if questionnaire:
        for v in questionnaire.values():
            if v:
                passed += 1

    # URL checks
    if url_checks:
        for check in url_checks.values():
            if check.get('metadata', {}).get('compliant'):
                passed += 1
            if check.get('labels', {}).get('desc_compliant'):
                passed += 1
            if check.get('labels', {}).get('img_compliant'):
                passed += 1

    # Policy check
    if policy_check and policy_check.get('compliant'):
        passed += 1

    return passed


def count_total_checks(questionnaire, url_checks, policy_check):
    """Count total number of checks performed"""
    total = len(questionnaire) if questionnaire else 0

    if url_checks:
        total += len(url_checks) * 3  # metadata + labels per URL

    if policy_check:
        total += 1

    return total


def get_failed_checks(questionnaire, url_checks, policy_check):
    """Get list of failed checks with details"""
    failed = []

    # Check questionnaire (if provided)
    if questionnaire:
        question_map = {
            'has_synthetic_content': 'Does your platform host AI-generated content?',
            'has_disclosure_policy': 'Do you have a disclosure policy?',
            'labels_on_content': 'Are AI-generated content labeled?',
            'metadata_embedded': 'Is metadata embedded in content?',
            'user_notification': 'Do you notify users about AI content?',
            'content_tracking': 'Do you track AI-generated content?',
            'regular_audits': 'Do you conduct regular audits?',
            'staff_training': 'Is staff trained on AI disclosure?'
        }

        for key, question in question_map.items():
            if not questionnaire.get(key):
                failed.append({
                    'type': 'questionnaire',
                    'question': question,
                    'severity': 'high' if key in ['labels_on_content', 'metadata_embedded'] else 'medium'
                })

    # Check URL validations
    if url_checks:
        for url, check in url_checks.items():
            if not check.get('metadata', {}).get('compliant'):
                failed.append({
                    'type': 'metadata',
                    'url': url,
                    'issue': 'Missing AI disclosure in metadata',
                    'severity': 'high'
                })

            if not check.get('labels', {}).get('desc_compliant'):
                failed.append({
                    'type': 'label',
                    'url': url,
                    'issue': 'Missing visible AI-generated label on Descriptions',
                    'severity': 'high'
                })
            
            if not check.get('labels', {}).get('img_compliant'):
                failed.append({
                    'type': 'label',
                    'url': url,
                    'issue': 'Missing visible AI-generated label on Images',
                    'severity': 'high'
                })

    # Check policy
    if policy_check and not policy_check.get('compliant'):
        failed.append({
            'type': 'policy',
            'issue': 'Policy page missing required keywords',
            'missing_keywords': policy_check.get('missing_keywords', []),
            'severity': 'medium'
        })

    return failed
