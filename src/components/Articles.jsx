import React, { useState, useRef, useEffect } from 'react';
import {motion} from 'framer-motion';
import { fadeIn } from './variants';
import './Articles.css';
import phishingimage from '../assets/phishing.jpeg';
import strongpassword from '../assets/strong password.jpeg';
import cyber from '../assets/cyber.jpeg';
import twofactor from '../assets/twofactor1.jpg'



const articles = [
  {
    title: "Understanding Phishing Attacks",
    image: phishingimage,
    content: "Phishing attacks are deceptive attempts to steal sensitive information..."
  },
  {
    title: "The Importance of Strong Passwords",
    image: strongpassword,
    content: "Strong passwords are your first line of defense against unauthorized access..."
  },
  {
    title: "Cybersecurity Best Practices for Remote Work",
    image: cyber,
    content: "With the rise of remote work, cybersecurity has become more important than ever..."
  },
  {
    title: "2 Factor Authentication",
    image: twofactor,
    content: "Two-factor authentication (2FA) is an identity and access management security method that requires two forms of identification to access resources and data. 2FA gives businesses the ability to monitor and help safeguard their most vulnerable information and networks."
  }
];

function ArticlesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % articles.length);
    setExpandedCard(null);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
    setExpandedCard(null);
  };

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [startIndex]);
  return (
    <section className="articles-section" id="articles">
      <motion.h2
      variants={fadeIn("up",0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{once:false,amount:0.5}}
      
      
      
      >Basic Terminology</motion.h2>
      <div className="carousel">
        <button className="carousel-button-prev" onClick={prevSlide}>&lt;</button>
        <motion.div
        variants={fadeIn("up",0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once:false,amount:0.7}}
        
        className="card-container">
          {[0, 1, 2].map((offset) => {
            const index = (startIndex + offset) % articles.length;
            const isExpanded = expandedCard === index;
            return (
              <div
               
                className={`card ${isExpanded ? 'expanded' : ''}`} 
                key={index}
                onClick={() => toggleCard(index)}
              >
                <img src={articles[index].image} alt={articles[index].title} />
                <div className="card-content">
                  <h3>{articles[index].title}</h3>
                  <p className={isExpanded ? 'expanded' : ''}>
                    {articles[index].content}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
        <button className="carousel-button-next" onClick={nextSlide}>&gt;</button>
      </div>
    </section>
  );
}

export default ArticlesSection;