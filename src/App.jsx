import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ArticlesSection from './components/Articles';
import Resources from './components/Resources';
import HelpSection from './components/Help';
import Chatbot from './components/chatbot'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSection id="hero" />
              <ArticlesSection id="articles" />
              <Resources id="resources" />
              <HelpSection id="safety-tips" />
              <Chatbot id="bot"/>
             
            </main>
          } />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
