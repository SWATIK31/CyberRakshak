import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ArticlesSection from './components/Articles';
import Resources from './components/Resources';

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
             
            </main>
          } />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
