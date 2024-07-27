import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ArticlesSection from './components/Articles';
import Resources from './components/Resources';
import HelpSection from './components/Help';
import Chatbot from './components/chatbot';
import QuizApp from './components/Quiz';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './Screens/Dashboard';
import BlogCard from './components/BlogCard';
import { AuthProvider } from './context/authContext.jsx';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={
              <main>
                <HeroSection id="hero" />
                <QuizApp id="quiz" />
                <ArticlesSection id="articles" />
                <Resources id="resources" />
                <HelpSection id="safety-tips" />
                <BlogCard id="blog" />
                <Chatbot id="bot"/>
              </main>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;