import React from 'react';
import HeroSection from './HeroSection';
import QuizApp from './Quiz';
import ArticlesSection from './Articles';
import Resources from './Resources';
import HelpSection from './Help';

function MainPage() {
  return (
    <main>
      <div id="hero"><HeroSection /></div>
      <div id="quiz"><QuizApp /></div>
      <div id="articles"><ArticlesSection /></div>
      <div id="safety-tips">{/* Safety Tips Component */}</div>
      <div id="resources"><Resources/></div>
      <div id="help"><HelpSection/></div>
    </main>
  );
}
export default MainPage;
