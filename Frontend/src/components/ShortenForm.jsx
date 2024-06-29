import axios from 'axios';
import React, { useState } from 'react';
import './ShortenForm.css';

const ShortenForm = () => {
  const [url, setUrl] = useState({
    originalUrl: ""
  });

  const inputOnChange = (property, value) => {
    setUrl(prevObj => ({
      ...prevObj,
      [property]: value
    }));
  };

  const shortUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/shortner`, url);
      console.log(response.data); // Handle the response accordingly
      window.location.href="/"
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shorten-form-container">
      <h1>Shorten Your Loooong Links :)</h1>
      <p>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
      <form onSubmit={shortUrl} className="shorten-form">
        <div className="input-group">
          <input 
            onChange={(e) => { inputOnChange("originalUrl", e.target.value); }}
            value={url.originalUrl}
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
