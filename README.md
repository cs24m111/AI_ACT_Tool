# MeitY Synthetic Content Compliance Checker

A full-stack web application for checking compliance with MeitY (Ministry of Electronics and Information Technology) synthetic content disclosure requirements.

## Project Structure

```
compliance_checker/
├── backend/                    # Flask backend
│   ├── app/
│   │   ├── __init__.py        # Flask app factory
│   │   ├── config.py          # Configuration
│   │   ├── models.py          # MongoDB models
│   │   ├── blueprints/        # API routes
│   │   │   ├── api.py         # Main API endpoints
│   │   │   └── auth.py        # Authentication (stub)
│   │   └── services/          # Business logic
│   │       ├── scraper.py     # URL scraping
│   │       ├── metadata_checker.py  # Metadata validation
│   │       ├── label_checker.py     # Label detection
│   │       ├── scoring.py     # Compliance scoring
│   │       └── ai_suggester.py      # Remediation suggestions
│   ├── run.py                 # Application entry point
│   └── requirements.txt       # Python dependencies
│
└── frontend/                   # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── QuestionForm.jsx
    │   │   ├── ResultCard.jsx
    │   │   ├── EvidenceList.jsx
    │   │   └── ScoreBadge.jsx
    │   ├── pages/             # Page components
    │   │   ├── Home.jsx
    │   │   ├── Questionnaire.jsx
    │   │   ├── Results.jsx
    │   │   └── CompanyDetails.jsx
    │   ├── services/
    │   │   └── api.js         # API client
    │   ├── App.js             # Main app component
    │   └── index.js           # Entry point
    ├── package.json
    └── tailwind.config.js     # Tailwind CSS config
```

## Features

### Frontend
- **8-Question Questionnaire**: Comprehensive compliance assessment
- **Sample URL Validation**: Submit URLs for automated checks
- **Compliance Report**: Visual score display with detailed breakdown
- **Evidence Display**: Expandable evidence viewer with metadata, labels, and policy scans
- **Remediation Suggestions**: Actionable steps to fix compliance issues
- **Responsive Design**: Built with Tailwind CSS

### Backend
- **Modular Architecture**: Blueprint-based routing, service layer separation
- **URL Scraping**: Fetch and analyze web content
- **Metadata Extraction**: Check for AI-disclosure in metadata (HTML meta tags, media files)
- **Label Detection**: Find visible AI-generated labels
- **Policy Scanning**: Keyword-based policy page validation
- **Compliance Scoring**: Calculate overall compliance score
- **Evidence Packaging**: Store and retrieve validation evidence
- **MongoDB Storage**: Persist compliance checks and evidence

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB 4.4+

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start MongoDB:
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

6. Run the backend:
```bash
python run.py
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env if needed
```

4. Start development server:
```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Click "Start Compliance Check" or navigate to "Check Compliance"
3. Enter company name (optional)
4. Answer the 8 compliance questions
5. Provide sample content URLs and policy URL (optional)
6. Submit for validation
7. Review comprehensive compliance report with score, failed checks, and suggestions

## API Endpoints

### POST `/api/validate`
Submit questionnaire for validation
```json
{
  "company_name": "Example Corp",
  "questionnaire": {
    "has_synthetic_content": true,
    "has_disclosure_policy": true,
    ...
  },
  "sample_urls": ["https://example.com/content"],
  "policy_url": "https://example.com/policy"
}
```

### GET `/api/checks/:id`
Retrieve specific compliance check

### GET `/api/checks`
List all compliance checks

### GET `/api/evidence/:check_id`
Get evidence for specific check

## External Tools (Optional Enhancements)

For full metadata extraction functionality, install these tools:

### ffprobe (for video/audio metadata)
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

### exiftool (for image metadata)
```bash
# Ubuntu/Debian
sudo apt-get install libimage-exiftool-perl

# macOS
brew install exiftool

# Windows
# Download from https://exiftool.org/
```

### Selenium ChromeDriver (for headless scraping)
```bash
# Download ChromeDriver matching your Chrome version
# https://chromedriver.chromium.org/downloads
```

## Compliance Scoring

**Total Score: 100 points**
- Questionnaire (40 points): 5 points per question
- Metadata Checks (30 points): Based on URL validation
- Label Checks (20 points): Based on visible labels found
- Policy Check (10 points): Based on keyword presence

**Passing Threshold**: 70 points

## Future Enhancements

### Backend
- [ ] Implement actual ffprobe/exiftool integration
- [ ] Add OpenCV-based label detection
- [ ] Integrate LLM API for AI-powered suggestions
- [ ] Add OCR for screenshot analysis
- [ ] Implement authentication system
- [ ] Add rate limiting and API security

### Frontend
- [ ] Add user authentication
- [ ] Implement dashboard with historical checks
- [ ] Add data visualization (charts, graphs)
- [ ] Export reports as PDF
- [ ] Add real-time validation progress
- [ ] Implement dark mode

## Technologies Used

### Backend
- Flask 3.0
- MongoDB with pymongo
- BeautifulSoup4 for HTML parsing
- Requests for HTTP
- Python-dotenv for configuration

### Frontend
- React 18
- React Router 6
- Tailwind CSS 3
- Fetch API

## License

This is a proof-of-concept project for educational purposes.

## Support

For issues or questions, please open an issue on the project repository.
