import React from "react";

const ComplianceRules = () => {
  const complianceQuestions = [
    {
      question: "Does your platform host AI-generated content?",
      rule: "Implied Scope of Rules 3 & 4",
      rationale:
        "The entire purpose of the draft amendments is to strengthen the due diligence obligations for SMIs and SSMIs, as well as platforms that enable the creation or modification of synthetically generated content. Confirming that the platform hosts or handles such content establishes the applicability of these specialized rules.",
    },
    {
      question: "Do you have a disclosure policy?",
      rule: "Rule 3(1)(a) & 3(1)(b)",
      rationale:
        "Intermediaries must prominently publish their rules, regulations, privacy policy, and user agreement. They must also inform users of these policies and make reasonable efforts to ensure users do not host certain prohibited information. A disclosure policy specific to synthetic content is necessary to meet the broader Principle of Transparency.",
    },
    {
      question: "Are AI-generated content labeled?",
      rule: "Rule 3(3) & Rule 4(1A)",
      rationale:
        "This checks compliance with the core mandate: the proposed amendments introduce labelling requirements for synthetically generated information. Intermediaries enabling the creation or modification of such content must ensure it is labelled. SSMIs are specifically required to ensure that synthetically generated information is clearly labelled or accompanied by a notice. This enables users to distinguish synthetic from authentic content.",
    },
    {
      question: "Is metadata embedded in content?",
      rule: "Rule 3(3)",
      rationale:
        "The proposed amendments mandate metadata embedding requirements for synthetically generated information. Intermediaries offering computer resources enabling creation or modification of synthetic content must ensure such information is embedded with a permanent unique metadata or identifier. This is crucial for enhancing traceability and ensuring accountability.",
    },
    {
      question: "Do you notify users about AI content?",
      rule: "Rule 3(3) & Rule 4(1A)",
      rationale:
        "Notification is essential for transparency. The rules require that the label or identifier on synthetic content must be visibly displayed or made audible in a prominent manner. SSMIs must ensure synthetic content is accompanied by a notice indicating it is synthetically generated. This empowers users to distinguish authentic from synthetic information, thereby building public trust.",
    },
    {
      question: "Do you track AI-generated content?",
      rule: "Rule 4(1A)",
      rationale:
        "This verifies whether the SSMIs are fulfilling their enhanced obligation to manage synthetic content proactively. SSMIs are required to deploy reasonable and proportionate technical measures to verify whether content is synthetically generated. This enhanced verification obligation mandates the use of technical measures to confirm whether uploaded content is synthetic and label it accordingly.",
    },
    {
      question: "Do you conduct regular audits?",
      rule: "Rule 4(1)(d), Rule 4(4) & Rule 3(1)(n)",
      rationale:
        "Audits relate to the Principle of Accountability and ensuring due diligence is upheld. SSMIs are generally required to publish periodic compliance reports every month. Furthermore, if SSMIs deploy automated tools (which would be necessary for tracking synthetic content) they must implement mechanisms for appropriate human oversight, including a periodic review of any automated tools deployed to evaluate their accuracy and fairness.",
    },
    {
      question: "Is staff trained on AI disclosure?",
      rule: "Rule 4(1)(a) (Implied)",
      rationale:
        "While specific staff training is not explicitly detailed, SSMIs must appoint a Chief Compliance Officer (CCO) who is responsible for ensuring compliance with the Act and rules. The CCO is liable if due diligence is not observed. Given the detailed requirements for labelling and metadata embedding (Rule 3(3), 4(1A)), comprehensive staff training would be a necessary internal measure to support the CCO and ensure the required due diligence is observed consistently.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content Compliance Flow
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Regulatory compliance questions for platforms handling AI-generated
            content under proposed amendments
          </p>
        </div>

        <div className="space-y-8">
          {complianceQuestions.map((item, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < complianceQuestions.length - 1 && (
                <div className="absolute left-8 top-24 h-20 w-0.5 bg-gradient-to-b from-blue-400 to-blue-200"></div>
              )}

              {/* Question Card */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex">
                  {/* Question Number Circle */}
                  <div className="flex-shrink-0 p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 pr-8">
                    {/* Question */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.question}
                    </h3>

                    {/* Rule Reference */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.rule}
                      </span>
                    </div>

                    {/* Rationale */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">
                            Rationale for Inclusion
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.rationale}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Compliance Assessment Complete
              </h2>
              <p className="text-blue-100">
                These questions form the foundation of AI content governance
                under the proposed regulatory framework
              </p>
            </div>
            <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRules;
