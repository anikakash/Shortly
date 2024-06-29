import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div className="about-section">
      <h2>Why Use Our URL Shortener?</h2>
      <div className="highlight-bar">
        This section is for those who want to understand the benefits and features of our service.
      </div>
      <div className="cards-container">
        <div className="about-card" style={{ backgroundColor: '#5BBCFF' }}>
          <h3>Feature One</h3>
          <p>Our URL shortener provides robust analytics to track your link performance, ensuring you make data-driven decisions.</p>
          <button>Read more</button>
        </div>
        <div className="about-card" style={{ backgroundColor: '#00C853' }}>
          <h3>Feature Two</h3>
          <p>With our service, you can customize your short URLs to better represent your brand or business.</p>
          <button>Read more</button>
        </div>
        <div className="about-card" style={{ backgroundColor: '#5BBCFF' }}>
          <h3>Feature Three</h3>
          <p>Enjoy seamless integration with various tools and platforms, enhancing your workflow efficiency.</p>
          <button>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
