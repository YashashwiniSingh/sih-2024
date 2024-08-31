// src/components/NavBar.js
'use client'
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component for optimized loading
import { useState } from 'react';

const NavBar = () => {
  const [hover, setHover] = useState(null);

  const menuItems = [
    {
      name: 'My Aadhaar',
      subItems: [
        { name: 'Update Your Aadhaar', link: '#' },
        { name: 'Get Aadhaar', link: '#' },
        { name: 'Aadhaar Services', link: '#' },
      ],
    },
    {
      name: 'About UIDAI',
      subItems: [
        { name: 'Vision & Mission', link: '/about' },
        { name: 'Organizational Structure', link: '#' },
        { name: 'Legal Framework', link: '#' },
      ],
    },
    {
      name: 'Ecosystem',
      subItems: [
        { name: 'Partners', link: '#' },
        { name: 'Vendors', link: '#' },
        { name: 'Stakeholders', link: '#' },
      ],
    },
    {
      name: 'Media & Resources',
      subItems: [
        { name: 'Media Releases', link: '#' },
        { name: 'Reports', link: '#' },
        { name: 'News', link: '#' },
      ],
    },
    {
      name: 'Contact & Support',
      subItems: [
        { name: 'Help', link: '#' },
        { name: 'FAQs', link: '#' },
        { name: 'Support', link: '#' },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <nav className="bg-blue-600 p-4 fixed w-full top-0 right-0 z-10 flex justify-between items-center">
      {/* Logo section */}
      <div className="flex items-center">
        <Image
          src="/uidai.svg" // Path to the logo image
          alt="Logo"
          width={300} // Set appropriate width
          height={300} // Set appropriate height
          className="mr-4"
        />
          </div>
          <div className="flex items-center">
        <Image
          src="/aadhar.svg" // Path to the logo image
          alt="Logo"
          width={100} // Set appropriate width
          height={100} // Set appropriate height
          className="mr-4"
        />
          </div>
      
      {/* Navigation menu */}
      <ul className="flex space-x-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <span className="text-white cursor-pointer">{item.name}</span>
            {(hover === index) && (
              <div className="absolute bg-white shadow-lg p-4 top-8 right-0 w-48"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <ul>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="py-1 hover:text-blue-500">
                      <Link href={subItem.link}>{subItem.name}</Link>
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