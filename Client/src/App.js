import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css'
import About from './pages/About/About'
import Predict from './pages/Predict/Predict';
import Loader from './components/Loader/Loader';

function App() {

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/predict" element={<Predict />} />
            </Routes>
            <Footer />
          </div>
        </Router>

      )}
    </div>
  );
}

export default App;
