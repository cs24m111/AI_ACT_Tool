import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-gray-400 text-sm">
              MeitY Compliance Checker helps organizations verify their
              adherence to synthetic content disclosure requirements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  MeitY Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Best Practices
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-400 text-sm">
              For support and inquiries, please contact:
              <br />
              <a
                href="mailto:support@compliance.gov.in"
                className="text-primary-400"
              >
                support@compliance.gov.in
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 MeitY Compliance Checker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
