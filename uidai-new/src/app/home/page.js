// src/app/home/page.js
'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import NavBar from '../components/NavBar'; // Import the NavBar component

const HomePage = () => {
  // Add animation to background or content here if necessary
  useEffect(() => {
    // Simple animation or JavaScript to handle content scrolling or animations
  }, []);

  return (
    <div className="relative">
      <NavBar />
      <header className="relative bg-gradient-to-r from-blue-500 to-blue-800 text-white overflow-hidden h-screen flex items-center justify-center">
        <div className="absolute inset-0 opacity-75 z-0">
          {/* Moving background graphics (can use CSS animations here) */}
          <div className="bg-hero bg-cover bg-center h-full w-full"></div>
        </div>
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold">myAadhaar</h1>
          <p className="text-lg mt-4">One portal for all online services</p>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center bg-gray-100 py-16">
        <section className="w-11/12 md:w-8/12 bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <h2 className="text-2xl font-bold text-center p-4 bg-blue-600 text-white">Announcements</h2>
          <div className="p-4 h-32 overflow-y-auto">
            {/* Automatically scrolling content window */}
            <ul className="list-disc list-inside">
              <li>New Aadhaar enrolment centers open now.</li>
              <li>Download your e-Aadhaar from the portal.</li>
              <li>Update your Aadhaar details online securely.</li>
              {/* More announcements */}
            </ul>
          </div>
        </section>

        {/* Additional content sections as needed */}
      </main>
    </div>
  );
};

export default HomePage;
