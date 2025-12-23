import re
import requests
from bs4 import BeautifulSoup

def scrape_url(url, timeout=10):
    """
    Scrape URL and extract relevant data
    Returns: dict with cleaned text (only from policy-title and policy-section)
    """
    headers = {
        'User-Agent': 'MeitY-Compliance-Checker/1.0'
    }

    try:
        response = requests.get(url, headers=headers, timeout=timeout, allow_redirects=True)
        response.raise_for_status()

        content_type = response.headers.get('Content-Type', '').lower()

        result = {
            'url': url,
            'status_code': response.status_code,
            'content_type': content_type,
            'size': len(response.content)
        }

        # Handle HTML content
        if 'text/html' in content_type:
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract only text from the specified classes
            titles = [el.get_text(separator=' ', strip=True) for el in soup.find_all(class_='policy-title')]
            sections = [el.get_text(separator=' ', strip=True) for el in soup.find_all(class_='policy-section')]

            combined_text = ' '.join(titles + sections)

            # ✅ Normalize spaces (remove extra and weird unicode ones)
            cleaned_text = re.sub(r'\s+', ' ', combined_text)  # collapse all whitespace
            cleaned_text = cleaned_text.replace('\u00a0', ' ')  # replace non-breaking spaces

            # ✅ Fix letter-separated words (like "A I - G e n e r a t e d" → "AI-Generated")
            cleaned_text = re.sub(r'(?<=\b)([A-Z])\s(?=[A-Z]\b)', r'\1', cleaned_text)  # join capital letters
            cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()

            result['text'] = cleaned_text

            # Keep the rest of your logic
            result['meta_tags'] = extract_meta_tags(soup)
            result['labels'] = find_labels_in_html(soup)
            # Collect image sources (first several); resolve relative URLs to absolute
            images = []
            for img in soup.find_all('img'):
                src = img.get('src') or img.get('data-src') or img.get('data-original')
                if not src:
                    continue
                # Resolve relative src to absolute URL
                try:
                    from requests.compat import urljoin
                    abs_url = urljoin(url, src)
                except Exception:
                    abs_url = src
                images.append(abs_url)

            # Keep first image (if any) and a small sample for evidence
            result['images'] = images[:5]

        elif any(t in content_type for t in ['video/', 'audio/', 'image/']):
            result['media_type'] = content_type.split('/')[0]
            result['message'] = 'Media file detected - metadata extraction requires ffprobe/exiftool'
            result['metadata_extraction'] = 'stub'

        return result

    except requests.RequestException as e:
        return {
            'url': url,
            'error': str(e),
            'status': 'failed'
        }


def extract_meta_tags(soup):
    """Extract relevant meta tags from HTML"""
    meta_tags = {}

    # Common meta tags
    for meta in soup.find_all('meta'):
        name = meta.get('name') or meta.get('property')
        content = meta.get('content')
        if name and content:
            meta_tags[name] = content

    return meta_tags


def find_labels_in_html(soup):
    """
    Look for AI/synthetic content labels in HTML
    Returns list of found labels with their properties
    """
    labels = []

    # Keywords to search for
    label_keywords = [
        'ai-generated',
        'synthetic',
        'artificially created',
        'computer generated',
        'deepfake',
        'ai content'
    ]

    # Search in text elements
    for tag in soup.find_all(['p', 'div', 'span', 'label']):
        text = tag.get_text().lower()
        for keyword in label_keywords:
            if keyword in text:
                labels.append({
                    'text': tag.get_text().strip(),
                    'tag': tag.name,
                    'class': tag.get('class', []),
                    'keyword': keyword
                })

    return labels


def scrape_with_headless(url):
    """
    Scrape URL using headless browser (Selenium)
    Use this for JavaScript-heavy pages
    Requires: selenium, chromedriver
    """
    # Placeholder for headless scraping
    # from selenium import webdriver
    # from selenium.webdriver.chrome.options import Options
    #
    # options = Options()
    # options.add_argument('--headless')
    # driver = webdriver.Chrome(options=options)
    # driver.get(url)
    # html = driver.page_source
    # driver.quit()

    return {'message': 'Headless scraping not yet implemented'}
