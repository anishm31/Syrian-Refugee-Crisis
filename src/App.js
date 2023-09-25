import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar.js';
import CountryModelPage from './Components/CountryModelPage';

function App() {
  return (
    <div>
      <MainNavbar />
      <CountryModelPage />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

