import os
import json
import subprocess

def check_metadata(scraped_data):
    """
    Check metadata for compliance indicators
    Looks for AI-generated flags in meta tags and embedded metadata
    """
    result = {
        'compliant': False,
        'has_ai_disclosure': False,
        'metadata_fields': [],
        'issues': []
    }

    # Check HTML meta tags
    meta_tags = scraped_data.get('meta_tags', {})
    # print("scrapped data \n\n",scraped_data)
    # print("meta tags \n\n",meta_tags)
    # Look for AI disclosure in meta tags
    ai_keywords = ['ai-generated', 'synthetic', 'artificial']

    for key, value in meta_tags.items():
        value_lower = str(value).lower()
        for keyword in ai_keywords:
            if keyword in value_lower or keyword in key.lower():
                result['has_ai_disclosure'] = True
                result['metadata_fields'].append({
                    'field': key,
                    'value': value,
                    'keyword': keyword
                })

    # Check for media metadata (if media file)
    media_type = scraped_data.get('images')
    # print("Media tupe ",media_type)
    if media_type:
        media_metadata = extract_media_metadata(scraped_data)
        result['media_metadata'] = media_metadata

        if media_metadata.get('has_ai_flag'):
            result['has_ai_disclosure'] = True

    # Determine compliance
    result['compliant'] = result['has_ai_disclosure']

    if not result['compliant']:
        result['issues'].append('No AI-generated disclosure found in metadata')

    return result


def extract_media_metadata(scraped_data):
    """
    Extract metadata from media files using ffprobe or exiftool

    For video/audio: ffprobe -v quiet -print_format json -show_format file.mp4
    For images: exiftool -json file.jpg

    Install:
    - ffprobe: apt-get install ffmpeg (Linux) or brew install ffmpeg (Mac)
    - exiftool: apt-get install libimage-exiftool-perl (Linux)
    """
    # Placeholder - actual implementation would:
    # 1. Download media file to temp location
    # 2. Run ffprobe/exiftool
    # 3. Parse JSON output
    # 4. Look for custom AI-related tags

    media_type = scraped_data.get('media_type')

    return {
        'stub': True,
        'media_type': media_type,
        'message': 'Actual metadata extraction requires ffprobe/exiftool',
        'has_ai_flag': False,
        'implementation_note': 'Use ffprobe for video/audio, exiftool for images'
    }


def run_ffprobe(file_path):
    """
    Run ffprobe on media file
    Returns JSON metadata
    """
    try:
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            file_path
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            return json.loads(result.stdout)
        else:
            return {'error': result.stderr}
    except FileNotFoundError:
        return {'error': 'ffprobe not installed'}
    except Exception as e:
        return {'error': str(e)}


def run_exiftool(file_path):
    """
    Run exiftool on image file
    Returns JSON metadata
    """
    try:
        cmd = ['exiftool', '-json', file_path]
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            return json.loads(result.stdout)[0]
        else:
            return {'error': result.stderr}
    except FileNotFoundError:
        return {'error': 'exiftool not installed'}
    except Exception as e:
        return {'error': str(e)}
