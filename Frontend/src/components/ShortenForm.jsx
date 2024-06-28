import React from 'react';
import './ShortenForm.css';

const ShortenForm = () => {
  return (
    <div className="shorten-form-container">
      <h1>Shorten Your Loooong Links :)</h1>
      <p>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
      <form className="shorten-form">
        <div className="input-group">
          <input 
            type="url" 
            placeholder="Enter The URL Here" 
            className="url-input"
          />
          <button type="submit" className="shorten-button">Shorten Now!</button>
        </div>
      </form>
    </div>
  );
};

export default ShortenForm;
