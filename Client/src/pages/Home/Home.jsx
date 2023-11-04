import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import RotatingCube from '../../components/RotatingCube/RotatingCube';

function Home() {
  return (
    <div className="home">
      <Navbar />
    <div className="homeCard">
      <div className="homeBody">
        <div className="leftHomeBody">
          <div className="homeTagLine">
            <div className="line-one">STEP UP YOUR </div>
            <div className="line-two"> <span>PREDICTION</span> WITH US</div>
          </div>
          <div className="homeButton">
            <button>PREDICT</button>
          </div>
        </div>
        <div className="rightHomeBody">
          <RotatingCube/>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
