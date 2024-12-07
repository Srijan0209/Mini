import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Separate CSS file for styling

function LandingPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Navigate to disease prediction page
  const handlePredictPage = () => {
    navigate('/disease-prediction');  // Redirect to the prediction page
  };

  // Navigate to login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Navigate to register page
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page bg-gradient-to-r from-blue-500 to-indigo-500 min-h-screen text-white">
      {/* Header with Disease Prediction button */}
      <header className="landing-header flex justify-between items-center p-4">
        <h1 className="logo text-3xl font-bold">Heart Link</h1>
        <nav className="flex space-x-6">
          <button onClick={handleLoginClick} className="login-button bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
            Login
          </button>
          <button onClick={handleRegisterClick} className="register-button bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded-lg">
            Register
          </button>
          <button onClick={handlePredictPage} className="predict-button bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg">
            Predict Disease
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section text-center py-20">
        <h2 className="hero-title text-4xl font-semibold mb-4">Connecting Lives, Saving Lives</h2>
        <p className="hero-text text-lg mb-8">
          Heart Link brings together blood donors and those in need, enhancing healthcare support with AI-powered guidance.
        </p>
        <button onClick={handleRegisterClick} className="cta-button bg-yellow-500 hover:bg-yellow-600 py-3 px-6 rounded-full text-lg">
          Get Started
        </button>
      </section>

      {/* About Section */}
      <section className="about-section py-16 text-center">
        <h3 className="text-3xl font-semibold mb-6">About Heart Link</h3>
        <p className="text-lg max-w-3xl mx-auto">
          Heart Link is a platform dedicated to connecting blood donors and recipients while offering AI-based health insights. Join us to make a difference in lives.
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section py-16 bg-gray-100">
        <h3 className="text-3xl font-semibold text-center mb-10">Our Features</h3>
        <div className="feature-cards flex justify-center space-x-10">
          <div className="feature-card p-6 bg-white shadow-lg rounded-xl text-center w-1/4">
            <img src="feature-image-1.jpg" alt="Donor Connection" className="mb-4" />
            <h4 className="font-semibold mb-2">Connect with Donors</h4>
            <p>Find and connect with blood donors nearby in real-time.</p>
          </div>
          <div className="feature-card p-6 bg-white shadow-lg rounded-xl text-center w-1/4">
            <img src="feature-image-2.jpg" alt="AI Health Support" className="mb-4" />
            <h4 className="font-semibold mb-2">AI Health Support</h4>
            <p>Get personalized health recommendations with our AI chatbot.</p>
          </div>
          <div className="feature-card p-6 bg-white shadow-lg rounded-xl text-center w-1/4">
            <img src="feature-image-3.jpg" alt="Real-Time Analytics" className="mb-4" />
            <h4 className="font-semibold mb-2">Real-Time Analytics</h4>
            <p>Track donation statistics and manage health data effectively.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-6 bg-blue-900 text-center text-white">
        <p>&copy; 2024 Heart Link. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;