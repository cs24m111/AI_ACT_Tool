import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              MeitY Compliance Checker
            </span>
          </Link>

          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/questionnaire"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Check Compliance
            </Link>
            <Link
              to="/rules"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              MeitY Rules
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
