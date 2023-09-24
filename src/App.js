import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar.js';
import ReactDOM from "react-dom/client";
import About from './Components/About.js';


export default function App() {
  return <h1>HOME</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

