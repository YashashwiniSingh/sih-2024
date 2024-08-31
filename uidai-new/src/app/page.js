// src/app/page.js
import Image from 'next/image'; // Importing the Image component

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Select your Preferred Language to Enter the Website
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-gray-300 p-4 rounded">English</button>
        <button className="bg-gray-300 p-4 rounded">हिंदी</button>
        <button className="bg-gray-300 p-4 rounded">অসমীয়া</button>
        {/* More buttons as needed */}
      </div>
      <div className="mt-8">
        {/* Using the Image component for optimization */}
        <Image
          src="/animated-image.png"
          alt="Animated Aadhaar Logo"
          width={256}
          height={256}
          className="animate-bounce"
        />
      </div>
    </main>
  );
}
