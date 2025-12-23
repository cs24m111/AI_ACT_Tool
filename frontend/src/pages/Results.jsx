import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import EvidenceList from '../components/EvidenceList';

function Results() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Results Found
        </h2>
        <p className="text-gray-600 mb-6">
          Please complete the questionnaire first.
        </p>
        <Link
          to="/questionnaire"
          className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700"
        >
          Go to Questionnaire
        </Link>
      </div>
    );
  }

  const { suggestions, evidence } = result;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/questionnaire"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            &larr; Back to Questionnaire
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Validation Results
        </h1>

        {/* Result Card */}
        <div className="mb-8">
          <ResultCard result={result} />
        </div>

        {/* Suggestions */}
        {suggestions && suggestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Remediation Suggestions
            </h2>
            <div className="space-y-6">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary-500 bg-primary-50 p-6 rounded-r-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {suggestion.title}
                    </h3>
                    <span
                      className={`
                        px-3 py-1 text-xs font-semibold rounded
                        ${
                          suggestion.severity === 'high'
                            ? 'bg-red-200 text-red-800'
                            : suggestion.severity === 'medium'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-blue-200 text-blue-800'
                        }
                      `}
                    >
                      {suggestion.severity} priority
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{suggestion.action}</p>

                  {suggestion.steps && suggestion.steps.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-800 mb-2">
                        Recommended Steps:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        {suggestion.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {suggestion.url && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Affected URL:</span>{' '}
                      <a
                        href={suggestion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        {suggestion.url}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evidence */}
        <EvidenceList evidence={evidence} />

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/questionnaire"
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Run Another Check
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
