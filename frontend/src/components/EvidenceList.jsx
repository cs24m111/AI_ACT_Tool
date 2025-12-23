import React, { useState } from "react";

function EvidenceList({ evidence }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!evidence || evidence.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
        No evidence collected.
      </div>
    );
  }

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Evidence</h2>

      <div className="space-y-4">
        {evidence.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleExpand(index)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-primary-600 uppercase">
                  {item.type}
                </span>
                {item.url && (
                  <span className="text-sm text-gray-600 truncate max-w-md">
                    {item.url}
                  </span>
                )}
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedIndex === index && (
              <div className="px-4 py-4 bg-white border-t border-gray-200">
                {/* Metadata Evidence */}
                {item.metadata && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Metadata Check
                    </h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={
                            item.metadata.compliant
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {item.metadata.compliant
                            ? "Compliant"
                            : "Non-Compliant"}
                        </span>
                      </p>
                      {item.metadata.has_ai_disclosure && (
                        <p className="mt-1">
                          <span className="font-medium">AI Disclosure:</span>{" "}
                          Found
                        </p>
                      )}
                      {item.metadata.metadata_fields &&
                        item.metadata.metadata_fields.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium">
                              Metadata Fields:
                            </span>
                            <ul className="list-disc list-inside ml-2 text-green-600">
                              {item.metadata.metadata_fields.map((fld, i) => (
                                <li key={i}>
                                  {fld.field}: {fld.value}{" "}
                                  {fld.keyword ? `(${fld.keyword})` : ""}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      {item.metadata.issues &&
                        item.metadata.issues.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium">Issues:</span>
                            <ul className="list-disc list-inside ml-2 text-red-600">
                              {item.metadata.issues.map((issue, i) => (
                                <li key={i}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Labels Evidence */}
                {item.labels && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Label Check
                    </h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      {/* Description Status----------------------------------------------------------------------------- */}
                      <p>
                        <span className="font-medium">Description Status:</span>{" "}
                        <span
                          className={
                            item.labels.desc_compliant
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {item.labels.desc_compliant
                            ? "Description Contains Information About AI-Generated Content."
                            : "Description Doesn't contain Information Regarding AI-Generated Content."}
                        </span>
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">Labels Found:</span>{" "}
                        {item.labels.desc_labels.length || 0}
                      </p>
                      {item.labels.desc_labels &&
                        item.labels.desc_labels.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium">
                              Detected Labels:
                            </span>
                            <ul className="list-disc list-inside ml-2">
                              {item.labels.desc_labels.map((label, i) => (
                                <li key={i}>{label}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      <br />
                      <hr />
                      <hr />
                      <hr />
                      <br />
                      {/* Image Status,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
                      <p>
                        <span className="font-medium">Image Status:</span>{" "}
                        <span
                          className={
                            item.labels.img_compliant
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {item.labels.img_compliant
                            ? "Image Contains Information About AI-Generated Content."
                            : "Image Doesn't contain Information Regarding AI-Generated Content."}
                        </span>
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">Labels Found:</span>{" "}
                        {item.labels.image_labels.length || 0}
                      </p>
                      {item.labels.image_labels &&
                        item.labels.image_labels.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium">
                              Detected Labels:
                            </span>
                            <ul className="list-disc list-inside ml-2">
                              {item.labels.image_labels.map((label, i) => (
                                <li key={i}>{label}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Policy Check Evidence */}
                {item.result && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Policy Scan Results
                    </h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={
                            item.result.compliant
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {item.result.compliant
                            ? "Compliant"
                            : "Non-Compliant"}
                        </span>
                      </p>
                      {item.result.found_keywords && (
                        <div className="mt-2">
                          <span className="font-medium">Found Keywords:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.result.found_keywords.map((kw, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.result.missing_keywords &&
                        item.result.missing_keywords.length > 0 && (
                          <div className="mt-2">
                            <span className="font-medium">
                              Missing Keywords:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.result.missing_keywords.map((kw, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {item.message && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700">
                    <span className="font-medium">Error:</span> {item.message}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvidenceList;
