import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import RotatingCube from '../../components/RotatingCube/RotatingCube';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="homeBody">
        <div className="leftHomeBody">
          <div className="homeTagLine">
          STEP UP YOUR <br/> PREDICTION WITH US
          </div>
          <div className="homeButton">
            <button>Predict</button>
          </div>
          
        </div>
        <div className="rightHomeBody">
          <RotatingCube/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
