import React from 'react';
import ScoreBadge from './ScoreBadge';

function ResultCard({ result }) {
  const { score, passed, passed_checks, total_checks, failed_checks } = result;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Compliance Report
          </h2>
          <p className="text-gray-600">
            {passed ? (
              <span className="text-green-600 font-semibold">Compliant</span>
            ) : (
              <span className="text-red-600 font-semibold">Non-Compliant</span>
            )}
          </p>
        </div>
        <ScoreBadge score={score} size="lg" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Passed Checks</p>
          <p className="text-2xl font-bold text-green-600">
            {passed_checks} / {total_checks}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Failed Checks</p>
          <p className="text-2xl font-bold text-red-600">
            {failed_checks?.length || 0}
          </p>
        </div>
      </div>

      {/* Failed Checks */}
      {failed_checks && failed_checks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Issues Found
          </h3>
          <div className="space-y-3">
            {failed_checks.map((check, index) => (
              <div
                key={index}
                className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">
                      {check.question || check.issue}
                    </p>
                    {check.url && (
                      <p className="text-sm text-gray-600 mt-1">
                        URL: {check.url}
                      </p>
                    )}
                    {check.missing_keywords && (
                      <p className="text-sm text-gray-600 mt-1">
                        Missing keywords: {check.missing_keywords.join(', ')}
                      </p>
                    )}
                  </div>
                  <span
                    className={`
                      px-2 py-1 text-xs font-semibold rounded
                      ${
                        check.severity === 'high'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }
                    `}
                  >
                    {check.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
