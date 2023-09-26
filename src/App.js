import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar.js';
import CountryModelPage from './Components/CountryModelPage';
import CharitiesModelPage from './Components/CharitiesModelPage';

function App() {
  return (
    <div>
      <CharitiesModelPage />
    </div>
  );
}

export default App;

