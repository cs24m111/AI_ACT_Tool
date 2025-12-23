import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          MeitY Synthetic Content
          <br />
          Compliance Checker
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Verify your platform's adherence to AI-generated content disclosure
          requirements with our comprehensive compliance tool.
        </p>
        <Link
          to="/questionnaire"
          className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
        >
          Start Compliance Check
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            8-Question Assessment
          </h3>
          <p className="text-gray-600">
            Comprehensive questionnaire covering all key compliance areas.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Automated Validation
          </h3>
          <p className="text-gray-600">
            Automatic checks for metadata, labels, and policy compliance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Detailed Reports
          </h3>
          <p className="text-gray-600">
            Comprehensive reports with actionable remediation suggestions.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Answer Questions
            </h4>
            <p className="text-sm text-gray-600">
              Complete the 8-question compliance questionnaire
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Provide URLs
            </h4>
            <p className="text-sm text-gray-600">
              Submit sample content URLs for automated validation
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Automated Check
            </h4>
            <p className="text-sm text-gray-600">
              System validates metadata, labels, and policies
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Get Report</h4>
            <p className="text-sm text-gray-600">
              Receive detailed report with remediation suggestions
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 rounded-lg shadow-lg p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Check Compliance?</h2>
        <p className="text-lg mb-6 opacity-90">
          Start your compliance assessment now and ensure your platform meets all
          MeitY requirements.
        </p>
        <Link
          to="/questionnaire"
          className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md"
        >
          Begin Assessment
        </Link>
      </div>
    </div>
  );
}

export default Home;
