import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SuccessForm() {
  const data = useSelector((state) => state); // access register slice

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 relative">

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link
            to="/register"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
          🎉 Congratulations!
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          You have successfully registered. Here's your information:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-200">
          <div><strong>First Name:</strong> {data.fname}</div>
          <div><strong>Last Name:</strong> {data.lname}</div>
          <div><strong>Email:</strong> {data.email}</div>
          <div><strong>Phone:</strong> {data.phone}</div>
          <div><strong>Country:</strong> {data.country?.label}</div>
          <div><strong>State:</strong> {data.state?.label}</div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 py-2"
          >
            Register Another User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessForm;
