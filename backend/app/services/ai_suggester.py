def generate_suggestions(failed_checks, questionnaire,policy_check,url_checks,url):
    """
    Generate remediation suggestions based on failed checks

    This is a template-based suggester.
    Future enhancement: integrate with LLM API (OpenAI, Anthropic, etc.)

    Plug-in point for LLM:
    - Send failed_checks and questionnaire to LLM
    - Request actionable remediation steps
    - Return structured suggestions
    """
    suggestions = []

    for check in failed_checks:
        check_type = check.get('type')

        if check_type == 'questionnaire':
            suggestion = generate_questionnaire_suggestion(check)
            suggestions.append(suggestion)

        elif check_type == 'metadata' and url_checks[url]['labels']['compliant']==False:
            suggestion = generate_metadata_suggestion(check)
            suggestions.append(suggestion)

        elif check_type == 'label' and url_checks[url]['labels']['img_compliant']==False:
            suggestion = generate_label_suggestion(check)
            suggestions.append(suggestion)

        elif check_type == 'policy' and policy_check['compliant'] == False:
            suggestion = generate_policy_suggestion(check)
            suggestions.append(suggestion)

    # Sort by severity
    suggestions.sort(key=lambda x: {'high': 0, 'medium': 1, 'low': 2}.get(x['severity'], 3))

    return suggestions


def generate_questionnaire_suggestion(check):
    """Generate suggestion for questionnaire failures"""
    question = check.get('question', '')

    suggestion_map = {
        'disclosure policy': {
            'title': 'Create AI Content Disclosure Policy',
            'action': 'Draft and publish a comprehensive policy for AI-generated content disclosure',
            'steps': [
                'Define what constitutes AI-generated content on your platform',
                'Establish disclosure requirements for content creators',
                'Publish policy on a public-facing page',
                'Ensure policy is accessible from main navigation'
            ]
        },
        'labeled': {
            'title': 'Implement Content Labeling System',
            'action': 'Add visible labels to all AI-generated content',
            'steps': [
                'Design a clear, consistent label (e.g., "AI-Generated")',
                'Ensure minimum font size of 12pt',
                'Place labels prominently (top or bottom of content)',
                'Use sufficient contrast ratio (4.5:1 minimum)'
            ]
        },
        'metadata': {
            'title': 'Embed AI Disclosure in Metadata',
            'action': 'Add AI-generated flags to content metadata',
            'steps': [
                'Add meta tag: <meta name="ai-generated" content="true">',
                'For media files, use ffmpeg to embed custom metadata',
                'For images, use EXIF tags to mark AI-generated content',
                'Document metadata schema for developers'
            ]
        },
        'notify users': {
            'title': 'Implement User Notification System',
            'action': 'Notify users when they encounter AI-generated content',
            'steps': [
                'Add notification banners for AI content',
                'Provide tooltips explaining AI-generated content',
                'Offer users ability to filter/hide AI content',
                'Log user acknowledgment of notifications'
            ]
        },
        'track': {
            'title': 'Implement Content Tracking',
            'action': 'Build system to track all AI-generated content',
            'steps': [
                'Add database field to flag AI-generated content',
                'Implement content tagging on upload/creation',
                'Build dashboard to monitor AI content volume',
                'Set up alerts for unlabeled AI content'
            ]
        },
        'audits': {
            'title': 'Establish Regular Audit Process',
            'action': 'Create schedule for compliance audits',
            'steps': [
                'Set up quarterly compliance reviews',
                'Randomly sample content for label verification',
                'Check metadata consistency across platform',
                'Document findings and remediation actions'
            ]
        },
        'training': {
            'title': 'Implement Staff Training Program',
            'action': 'Train staff on AI disclosure requirements',
            'steps': [
                'Create training materials on MeitY guidelines',
                'Conduct workshops for content moderators',
                'Train developers on metadata implementation',
                'Establish certification process for key staff'
            ]
        }
    }

    # Find matching suggestion
    for key, template in suggestion_map.items():
        if key in question.lower():
            return {
                'title': template['title'],
                'action': template['action'],
                'steps': template['steps'],
                'severity': check.get('severity', 'medium')
            }

    # Default suggestion
    return {
        'title': 'Address Questionnaire Item',
        'action': f'Review and address: {question}',
        'steps': ['Evaluate current practices', 'Implement necessary changes'],
        'severity': check.get('severity', 'medium')
    }


def generate_metadata_suggestion(check):
    """Generate suggestion for metadata failures"""
    return {
        'title': 'Add AI Disclosure to Content Metadata',
        'action': f'Add metadata to content at: {check.get("url")}',
        'steps': [
            'Add HTML meta tag: <meta name="ai-generated" content="true">',
            'Include description: <meta name="ai-description" content="AI-generated image">',
            'For media files, use ffprobe to embed custom metadata field',
            'Verify metadata is readable by standard tools'
        ],
        'severity': check.get('severity', 'high'),
        'url': check.get('url')
    }


def generate_label_suggestion(check):
    """Generate suggestion for label failures"""
    return {
        'title': 'Add Visible AI-Generated Label',
        'action': f'Add visible label to content at: {check.get("url")}',
        'steps': [
            'Add text label: "AI-Generated Content" or similar',
            'Ensure minimum 12pt font size',
            'Position prominently (top/bottom of content)',
            'Use high contrast color (e.g., white text on dark background)',
            'Make label permanent (not dismissible by users)'
        ],
        'severity': check.get('severity', 'high'),
        'url': check.get('url')
    }


def generate_policy_suggestion(check):
    """Generate suggestion for policy failures"""
    missing = check.get('missing_keywords', [])
    return {
        'title': 'Update Disclosure Policy Page',
        'action': 'Add missing required terms to policy page',
        'steps': [
            f'Add missing keywords: {", ".join(missing)}',
            'Define AI-generated content clearly',
            'Explain labeling and disclosure practices',
            'Describe user rights and controls',
            'Link to MeitY guidelines'
        ],
        'severity': check.get('severity', 'medium'),
        'missing_keywords': missing
    }


def generate_llm_suggestions(failed_checks, questionnaire):
    """
    Placeholder for LLM-powered suggestions

    Integration example:

    import openai

    prompt = f'''
    Generate compliance remediation suggestions for:
    Failed Checks: {json.dumps(failed_checks)}
    Questionnaire: {json.dumps(questionnaire)}

    Provide actionable steps for each failed check.
    '''

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return parse_llm_response(response)
    """
    return {
        'message': 'LLM integration not yet implemented',
        'note': 'Add OpenAI/Anthropic API key to enable AI-powered suggestions'
    }
