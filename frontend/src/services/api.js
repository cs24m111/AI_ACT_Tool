const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Submit questionnaire for validation
 */
export async function validateCompliance(data) {
  return fetchAPI('/validate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get compliance check by ID
 */
export async function getCheck(checkId) {
  return fetchAPI(`/checks/${checkId}`);
}

/**
 * List all compliance checks
 */
export async function listChecks() {
  return fetchAPI('/checks');
}

/**
 * Get evidence for a specific check
 */
export async function getEvidence(checkId) {
  return fetchAPI(`/evidence/${checkId}`);
}

/**
 * Health check
 */
export async function healthCheck() {
  const url = API_BASE_URL.replace('/api', '/health');
  const response = await fetch(url);
  return response.json();
}

export default {
  validateCompliance,
  getCheck,
  listChecks,
  getEvidence,
  healthCheck,
};
