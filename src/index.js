import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar.js';
import HomePage from './Components/HomePage.js';
import About from './Components/About.js';
import CountryModelPage from './Components/CountryModelPage';
import CharityModelPage from './Components/CharityModelPage';
import NewsEventsModelPage from './Components/NewsEventsModelPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <MainNavbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/countries" element={<CountryModelPage />} />
        <Route path="/charities" element={<CharityModelPage />} />
        <Route path="/news-and-events" element={<NewsEventsModelPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
