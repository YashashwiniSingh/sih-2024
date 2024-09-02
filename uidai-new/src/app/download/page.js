'use client'
// src/app/download/page.js or src/pages/download.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './download.module.css';

const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};

const InteractionCapture = () => {
  const [interactionData, setInteractionData] = useState({
    mouseMovements: [],
    keystrokes: [],
    scrollingPatterns: [],
    ipAddress: '',
  });

  useEffect(() => {
    // Throttled function to handle mouse movements every 100ms
    const handleMouseMove = throttle((event) => {
      setInteractionData((prevState) => ({
        ...prevState,
        mouseMovements: [
          ...prevState.mouseMovements,
          { x: event.clientX, y: event.clientY, timestamp: Date.now() },
        ],
      }));
    }, 100); // Throttle to 100ms

    // Capture keystrokes
    const handleKeyDown = (event) => {
      setInteractionData((prevState) => ({
        ...prevState,
        keystrokes: [
          ...prevState.keystrokes,
          { key: event.key, timestamp: Date.now() },
        ],
      }));
    };

    // Capture scrolling patterns
    const handleScroll = () => {
      setInteractionData((prevState) => ({
        ...prevState,
        scrollingPatterns: [
          ...prevState.scrollingPatterns,
          { scrollY: window.scrollY, timestamp: Date.now() },
        ],
      }));
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    // Get client IP address
    axios.get('https://api.ipify.org?format=json').then((response) => {
      setInteractionData((prevState) => ({
        ...prevState,
        ipAddress: response.data.ip,
      }));
    });

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Send mouse movement data every 100ms
    const mouseMovementInterval = setInterval(() => {
      axios.post('/api/store-interactions', interactionData)
        .then((response) => {
          console.log('Mouse movements sent:', response.data);
        })
        .catch((error) => {
          console.error('Error sending mouse movements:', error);
        });
    }, 100); // 100ms

    // Send all interaction data every 30 seconds
    const allDataInterval = setInterval(() => {
      axios.post('/api/store-interactions', interactionData)
        .then((response) => {
          console.log('Data stored successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error storing data:', error);
        });

      // Reset interaction data to start fresh for the next interval
      setInteractionData((prevState) => ({
        mouseMovements: [],
        keystrokes: [],
        scrollingPatterns: [],
        ipAddress: prevState.ipAddress, // Keep IP address
      }));
    }, 30000); // 30 seconds

    return () => {
      clearInterval(mouseMovementInterval);
      clearInterval(allDataInterval); // Cleanup intervals on component unmount
    };
  }, [interactionData]);

  const [showOtp, setShowOtp] = useState(false);

  const showOtpSection = () => {
    // Check if the user has moved the mouse enough times to be considered a human
    if (interactionData.mouseMovements.length > 3) {
      setShowOtp(true);
      alert('Verified as human');
    } else {
      alert('Please interact with the page to verify you are a human.');
    }
  };  
    
  return (
    <div className='interaction-page'>
      <header className={styles.header}>
        <div className={styles.titleSection}>
        </div>
      </header>

      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <span className={styles.myAadhaarLabel}>myAadhaar</span>
        </div>
        <div className={styles.navRight}>
          <div className={styles.languageDropdown}>
            <button className={styles.dropbtn}>English ▼</button>
            <div className={styles.dropdownContent}>
              <a href="#">English</a>
              <a href="#">हिन्दी</a>
              <a href="#">বাংলা</a>
              {/* Add more language options here */}
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.mainContainer}>
        <div className={styles.formSection}>
          <h2>eAadhaar Download</h2>
          <form id="aadhaar-form">
            <p>Select 12 digit Aadhaar Number / 16 digit Virtual ID (VID) Number / 28 digit Enrollment ID (EID) Number</p>
            <label>
              <input type="radio" name="id-type" value="aadhaar" defaultChecked /> Aadhaar Number
            </label>
            <label>
              <input type="radio" name="id-type" value="enrollment" /> Enrollment ID Number
            </label>
            <label>
              <input type="radio" name="id-type" value="virtual" /> Virtual ID Number
            </label>

            <div className={styles.inputGroup}>
              <input type="text" id="aadhaar-number" placeholder="Enter Aadhaar Number" required />
            </div>

            {/* Apply the local button class */}
            <button type="button" className={styles.button} onClick={showOtpSection}>Send OTP</button>

            {showOtp && (
              <div className={styles.otpSection}>
                <div className={styles.inputGroup}>
                  <label htmlFor="otp">Enter OTP</label>
                  <input type="text" id="otp" placeholder="Enter OTP" required />
                </div>
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span> This is a required field and valid data to be entered.
                </div>
                {/* Apply the specific button class for submit */}
                <button type="submit" className={styles.buttonSubmit}>Verify & Download</button>
              </div>
            )}
          </form>
        </div>

        <div className={styles.faqSection}>
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li>What is e-Aadhaar?</li>
            <li>Is e-Aadhaar equally valid like physical copy of Aadhaar?</li>
            <li>What is Masked Aadhaar?</li>
            <li>How to validate digital signatures in e-Aadhaar?</li>
            <li>What is the password of e-Aadhaar?</li>
            <li>What supporting software is needed to open e-Aadhaar?</li>
            <li>How can an Aadhaar Number holder download e-Aadhaar?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
  

export default InteractionCapture;