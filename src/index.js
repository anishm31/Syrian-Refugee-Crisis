import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar.js';
import About from './Components/About.js';
import CountryModelPage from './Components/CountryModelPage';
import CharityModelPage from './Components/CharityModelPage';
import NewsEventsModelPage from './Components/NewsEventsModelPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

    <MainNavbar/>
        <Routes> 
            <Route exact path = "/" element ={<App />}/>
            <Route path = "/about" element ={<About />}/>
            <Route path = "/countries" element = {<CountryModelPage />}/>
            <Route path = "/charities" element = {<CharityModelPage />}/>
            <Route path = "/news-and-events" element = {<NewsEventsModelPage />}/>
        </Routes>

  </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
