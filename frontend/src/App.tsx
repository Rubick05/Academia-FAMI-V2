// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Inscribete from './pages/Inscribete';
import Horarios from './pages/Horarios';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/inscribete" element={<Inscribete />} />
            <Route path="/horarios" element={<Horarios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
