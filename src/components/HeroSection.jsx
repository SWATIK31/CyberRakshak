import React, { useState, useEffect } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [headingText, setHeadingText] = useState('');
  const [paragraphText, setParagraphText] = useState('');
  const fullHeadingText = 'WELCOME TO CYBER RAKSHAK';
  const fullParagraphText = 'Learn, test your knowledge, and stay safe online';

  useEffect(() => {
    let headingIndex = 0;
    let paragraphIndex = 0;
    let headingTimer;
    let paragraphTimer;

    const typeHeading = () => {
      if (headingIndex < fullHeadingText.length) {
        setHeadingText(fullHeadingText.slice(0, headingIndex + 1));
        headingIndex++;
        headingTimer = setTimeout(typeHeading, 100); 
      } else {
        typeParagraph();
      }
    };

    const typeParagraph = () => {
      if (paragraphIndex < fullParagraphText.length) {
        setParagraphText(fullParagraphText.slice(0, paragraphIndex + 1));
        paragraphIndex++;
        paragraphTimer = setTimeout(typeParagraph, 50);
      }
    };

    typeHeading();

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(paragraphTimer);
    };
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="heading">{headingText}</h1>
        <p>{paragraphText}</p>
      </div>
    </div>
  );
}

export default HeroSection;