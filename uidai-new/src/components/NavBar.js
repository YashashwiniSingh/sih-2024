// src/components/NavBar.js
'use client'
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [hover, setHover] = useState(null);

  const menuItems = [
    {
      name: 'My Aadhaar',
      subItems: ['Update Your Aadhaar', 'Get Aadhaar', 'Aadhaar Services'],
    },
    {
      name: 'About UIDAI',
      subItems: ['Vision & Mission', 'Organizational Structure', 'Legal Framework'],
    },
    {
      name: 'Ecosystem',
      subItems: ['Partners', 'Vendors', 'Stakeholders'],
    },
    {
      name: 'Media & Resources',
      subItems: ['Media Releases', 'Reports', 'News'],
    },
    {
      name: 'Contact & Support',
      subItems: ['Help', 'FAQs', 'Support'],
    },
  ];

  return (
    <nav className="bg-blue-600 p-4 fixed w-full top-0 right-0 z-10 flex justify-center">
      <ul className="flex space-x-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="text-white cursor-pointer">{item.name}</span>
            {hover === index && (
              <div className="absolute bg-white shadow-lg p-4 top-8">
                <ul>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="py-1 hover:text-blue-500">
                      <Link href="#">{subItem}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
        <li className="text-white">
          <Link href="/download">Download Aadhaar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
