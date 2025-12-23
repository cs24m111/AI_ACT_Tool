import React, { useState } from "react";

const QUESTIONS = [
  {
    id: "has_synthetic_content",
    question:
      "Does your platform host or distribute AI-generated/synthetic content?",
    type: "boolean",
  },
  {
    id: "has_disclosure_policy",
    question:
      "Do you have a public disclosure policy for AI-generated content?",
    type: "boolean",
    urlField: "policy_url",
    urlLabel: "Policy URL",
  },
  {
    id: "labels_on_content",
    question: "Are all AI-generated content items labeled visibly?",
    type: "boolean",
  },
  {
    id: "metadata_embedded",
    question: "Is AI-disclosure metadata embedded in content files?",
    type: "boolean",
  },
  {
    id: "user_notification",
    question: "Do you notify users when they encounter AI-generated content?",
    type: "boolean",
  },
  {
    id: "content_tracking",
    question: "Do you maintain a tracking system for all AI-generated content?",
    type: "boolean",
  },
  {
    id: "regular_audits",
    question: "Do you conduct regular compliance audits?",
    type: "boolean",
  },
  {
    id: "staff_training",
    question: "Is your staff trained on AI content disclosure requirements?",
    type: "boolean",
  },
];

function QuestionForm({ onSubmit, loading }) {
  const [answers, setAnswers] = useState({});
  const [sampleUrls, setSampleUrls] = useState([""]);
  const [policyUrl, setPolicyUrl] = useState("");

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleAddUrl = () => {
    setSampleUrls([...sampleUrls, ""]);
  };

  const handleRemoveUrl = (index) => {
    setSampleUrls(sampleUrls.filter((_, i) => i !== index));
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...sampleUrls];
    newUrls[index] = value;
    setSampleUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("policy url:", policyUrl);
    const data = {
      questionnaire: answers,
      sample_urls: sampleUrls.filter((url) => url.trim() !== ""),
      policy_url: policyUrl,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">


      {/* Sample URLs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Sample Content URLs (Optional)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Provide URLs to sample AI-generated content for automated validation.
        </p>

        {sampleUrls.map((url, index) => (
          <div key={index} className="flex space-x-2 mb-3">
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder="https://example.com/content"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {sampleUrls.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveUrl(index)}
                className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddUrl}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          + Add Another URL
        </button>
      </div>

      {/* Questions removed — automated checks will validate sample URLs and policy automatically */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-800 mb-2">The questionnaire section has been removed. Provide sample URLs and a policy URL for automated validation.</p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
        >
          {loading ? "Validating..." : "Submit for Validation"}
        </button>
      </div>
    </form>
  );
}

export default QuestionForm;
