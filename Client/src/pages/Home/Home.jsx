import React from 'react';
import './Home.css';
import RotatingCube from '../../components/RotatingCube/RotatingCube';
import { ReactComponent as BgImage } from '../../Images/bg.svg';
import UpcomingMatches from '../../components/UpcomingMatches/UpcomingMatches';

function Home() {
  return (
    <div className="home">
      <div className="homeCard">
        <div className="homeBody">
          <div className="leftHomeBody">
            <div className="homeTagLine">
              <div className="line-one">STEP UP YOUR </div>
              <div className="line-two">
                <span>PREDICTION</span> WITH US
              </div>
            </div>
            <div className="homeButton">
                <a href="/predict">PREDICT</a>
                <a href="/about">ABOUT</a>
            </div>
          </div>
          <div className="rightHomeBody">
            <RotatingCube />
          </div>
        </div>
        <div className="bgImage">
          <BgImage className='svg1'/>
          <BgImage className='svg2'/>
        </div>
      </div>
      <div className="liveScore">
        <UpcomingMatches/>
      </div>
    </div>
  );
}

export default Home;
