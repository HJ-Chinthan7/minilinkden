import React, { useContext } from 'react';
import  AuthContext  from '../context/AuthContext';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import '../styles/Home.css';

function Home() {
  const { user } = useContext(AuthContext);


  return (
    <div className="home-container">
     
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MiniLinkden</h1>
          <p className="hero-subtitle">
            Connect, share, and grow your professional network
          </p>
          {!user && (
            <div className="hero-cta">
              <a href="/register" className="cta-button primary">Get Started</a>
              <a href="/login" className="cta-button secondary">Sign In</a>
            </div>
          )}
        </div>
      </section>

      <section className="main-content-section">
        <div className="content-wrapper">
          <div className="welcome-section">
            <h2>Stay Connected</h2>
            <p>Share your thoughts, connect with professionals, and build meaningful relationships.</p>
          </div>

        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h2>Why Choose MiniLinkden?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Connect</h3>
              <p>Build your professional network with like-minded individuals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Share</h3>
              <p>Share your ideas and insights with the community</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Grow</h3>
              <p>Advance your career through meaningful connections</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
