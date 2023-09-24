import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

export default App;
