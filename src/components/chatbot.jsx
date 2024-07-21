import React, { useState, useCallback } from 'react';
import './chatbot.css';

const cybersecurityQA = {
    "What is phishing?": "P hishing is a type of cyber attack where attackers attempt to trick individuals into revealing sensitive information by posing as a trustworthy entity.",
    "How can I create a strong password?": "U se a combination of uppercase and lowercase letters, numbers, and symbols. Make it at least 12 characters long and avoid using personal information.",
    "What is a firewall?": "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted network and an untrusted network.",
    "What is malware?": "M alware is malicious software designed to disrupt, damage, or gain unauthorized access to computer systems. Common types of malware include viruses, worms, trojans, and ransomware.",
    "What is two-factor authentication (2FA)?": "T wo-factor authentication (2FA) is a security process in which users provide two different authentication factors to verify their identity. This typically involves something you know (like a password) and something you have (like a smartphone).",
    "How can I recognize a secure website?": "L ook for 'https' in the URL and a padlock icon in the browser's address bar. These indicate that the website uses SSL/TLS encryption to secure data transmitted between your browser and the website.",
    "What should I do if I suspect a phishing email?": "I f you suspect a phishing email, do not click on any links or attachments. Report the email to your IT department or email provider, and delete it immediately.",
    "How can I contact you for more information?": "Yoou can contact us for more information by sending an email to info@cybersecurityawareness.com."
  };
  

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const typeAnswer = useCallback((answer) => {
    setIsTyping(true);
    setDisplayedAnswer('');
    let index = 0;

    const typeChar = () => {
      if (index < answer.length) {
        setDisplayedAnswer(prev => prev + answer.charAt(index));
        index++;
        setTimeout(typeChar, 30);
      } else {
        setIsTyping(false);
      }
    };

    if (answer.length > 0) {
      setDisplayedAnswer(answer.charAt(0));
      index = 1;
      setTimeout(typeChar, 30);
    } else {
      setIsTyping(false);
    }
  }, []);

  const handleQuestionClick = useCallback((question) => {
    setSelectedQuestion(question);
    const answer = cybersecurityQA[question];
    typeAnswer(answer);
  }, [typeAnswer]);

  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatbot}>
        💬
      </div>
      {isOpen && (
        <div className="chatbox">
          <h2 className='BotHeading'>CyberBot</h2>
          <div className="question-list">
            {Object.keys(cybersecurityQA).map((question, index) => (
              <div key={index} className="question" onClick={() => handleQuestionClick(question)}>
                {question}
              </div>
            ))}
          </div>
          {selectedQuestion && (
            <div className="answer">
              <h3>{selectedQuestion}</h3>
              <p>{displayedAnswer}</p>
              {isTyping && <span className="typing-indicator">▋</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Chatbot;
