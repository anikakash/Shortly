import React, { useState } from 'react';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import LinkTable from './components/LinkTable';
import NavBar from './components/NavBar';
import ShortenForm from './components/ShortenForm';
import './main.css';

const App = () => {
  const [links, setLinks] = useState([
    {
      originalUrl: 'https://www.example.com/very-long-url-that-needs-to-be-truncated',
      shortUrl: 'https://link.ly/abcd',
      date: 'Oct - 10 - 2023'
    },
    {
      originalUrl: 'https://www.anotherexample.com/another-very-long-url-that-needs-to-be-truncated',
      shortUrl: 'https://link.ly/efgh',
      date: 'Oct - 08 - 2023'
    }
  ]);

  return (
    <>
      <NavBar />
      <ShortenForm />
      <LinkTable />
      <AboutSection />
      <Footer/>
    </>
  );
};

export default App;



