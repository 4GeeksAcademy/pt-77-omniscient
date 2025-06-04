import React from "react";
import { Link } from "react-router-dom";

export const MustLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-red-600">You must be logged in</h1>
      <p className="text-gray-700 mt-4">Please log in to continue.</p>
      <Link
        to="/login"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};