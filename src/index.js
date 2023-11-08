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
import CountryInstancePage from './Components/CountryInstancePage';
import CharityInstancePage from './Components/CharityInstancePage';
import NewsEventsInstancePage from './Components/NewsEventsInstancePage';
import TimeLine from './Components/Timeline';
import SearchResultsPage from './Components/SearchResultsPage';
import TimelineBackground from './Components/TimelineBackground.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

    <MainNavbar/>
    <Routes> 
        <Route exact path="/" element={<HomePage />} />
        <Route path = "/about" element ={<About />}/>
        <Route path = "/timeline" element ={<TimelineBackground />}/>
        <Route path = "/countries" element = {<CountryModelPage />}/>
        <Route path = "/charities" element = {<CharityModelPage />}/>
        <Route path = "/news-and-events" element = {<NewsEventsModelPage />}/>
        <Route path = "/countries/:id" element = {<CountryInstancePage />}/>
        <Route path = "/charities/:id" element = {<CharityInstancePage />}/>
        <Route path = "/news-and-events/:id" element = {<NewsEventsInstancePage />}/>
        <Route path="/search/:query" element={<SearchResultsPage />} />
    </Routes>

  </Router>

  </React.StrictMode>
);
