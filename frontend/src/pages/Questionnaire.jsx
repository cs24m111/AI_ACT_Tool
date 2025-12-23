import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';
import { validateCompliance } from '../services/api';

function Questionnaire() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        company_name: companyName || 'Anonymous',
        questionnaire: data.questionnaire,
        sample_urls: data.sample_urls,
        policy_url: data.policy_url,
      };

      const response = await validateCompliance(payload);

      if (response.success) {
        // Navigate to results page with data
        navigate('/results', { state: { result: response.data } });
      } else {
        setError(response.error || 'Validation failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during validation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compliance Questionnaire
          </h1>
          <p className="text-lg text-gray-600">
            Answer the following questions to assess your platform's compliance
            with MeitY synthetic content disclosure requirements.
          </p>
        </div>

        {/* Company Name */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Company/Platform Name (Optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong className="font-semibold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        {/* Question Form */}
        <QuestionForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default Questionnaire;
