import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center text-center">
        {/* Warning SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-white mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M4.293 17.707A1 1 0 015 17h14a1 1 0 01.707 1.707l-7 7a1 1 0 01-1.414 0l-7-7z"
          />
        </svg>

        <h1 className="text-white text-4xl font-bold">404 - Not Found</h1>
        <p className="text-gray-300 mt-2 mb-6">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
