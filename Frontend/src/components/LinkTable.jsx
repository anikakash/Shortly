import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './LinkTable.css';

const LinkTable = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Short URL copied to clipboard');
  };

  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const getAllUrl = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/get/all`);
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };
    getAllUrl();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="table-container">
      <table className="link-table">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Copy</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {urls?.map((link, index) => (
            <tr key={index}>
              <td>
                <div className="original-url">
                  <span>{link.originalUrl}</span>
                </div>
              </td>
              <td>{import.meta.env.VITE_API_BASE_URL+'/' + link.shortUrl}</td>
              <td>
                <button onClick={() => copyToClipboard(import.meta.env.VITE_API_BASE_URL+'/'+ link.shortUrl)}>Copy</button>
              </td>
              <td>{formatDate(link.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
