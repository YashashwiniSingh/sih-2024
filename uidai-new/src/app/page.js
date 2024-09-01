'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LanguageSelectionPage = () => {
  // JavaScript function to navigate between different language sections
  const navigate = (sectionId) => {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      if (page) {
        page.style.display = 'none';
      }
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
    }
  };

  const handleLanguageSelection = () => {
    router.push('/home'); // Redirect to the homepage
  };

  // Use an effect to run when the component mounts
  useEffect(() => {
    // Delay navigate call to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      navigate('uidai_1'); // Ensure this id exists in the DOM
    }, 100); // 100ms delay for safety, adjust as needed

    // Cleanup function to clear timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={styles.body}>
      <header>
      </header>

      {/* Define the section with id 'uidai_1' to be navigated to */}
      <section id="uidai_1" className="page" style={styles.mainSection}>
        <div style={styles.mainContent}>
          <h1>Unique Identification Authority of India</h1>
          <h2 style={styles.h2}>Select your Preferred Language to Enter the Website</h2>
          <p style={styles.p}>वेबसाइट में प्रवेश करने के लिए अपनी पसंदीदा भाषा का चयन करें</p>
          <div style={styles.languageOptions}>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>English</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>हिंदी</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>অসমীয়া</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>বাংলা</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>ಕನ್ನಡ</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>ગુજરાતી</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>മലയാളം</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>मराठी</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>ଓଡ଼ିଆ</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>ਪੰਜਾਬੀ</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>தமிழ்</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>తెలుగు</button>
            <button style={styles.languageButton} onClick={handleLanguageSelection}>اردو</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Inline styles
const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  headerContent: {
    backgroundColor: 'blue',
    padding: '20px 0',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
  },
  govLogo: {
    width: '200px',
    marginBottom: '10px',
    justifyContent: 'flex-start',
  },
  mainSection: {
    backgroundColor: '#e9ecef',
    padding: '30px 0',
  },
  mainContent: {
    backgroundColor: '#ffffff',
    padding: '30px',
    margin: '0 auto',
    width: '80%',
    maxWidth: '800px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  aadhaarLogo: {
    width: '150px',
    height: 'auto',
    margin: '20px 0',
  },
  h2: {
    color: '#006699',
    fontSize: '18px',
    marginBottom: '10px',
  },
  p: {
    color: '#006699',
    fontSize: '14px',
    marginBottom: '20px',
  },
  languageOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  languageButton: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    width: '120px',
    margin: '5px',
    textAlign: 'center',
    color: '#006699',
  },
};

export default LanguageSelectionPage;