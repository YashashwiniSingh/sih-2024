// src/pages/download.js
import React from 'react';

const Download = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Download Aadhaar</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">
              Enter Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaarNumber"
              name="aadhaarNumber"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download Aadhaar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Download;
