import React from 'react';
import './LinkTable.css';

const LinkTable = ({ links }) => {

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Short URL copied to clipboard');
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
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={index}>
              <td>
                <div className="original-url">
                  <span>{link.originalUrl}</span>
                </div>
              </td>
              <td>{link.shortUrl}</td>
              <td>
                <button onClick={() => copyToClipboard(link.shortUrl)}>Copy</button>
              </td>
              <td>{link.date}</td>
              {/* <td>
                <button>Edit</button>
                <button>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
