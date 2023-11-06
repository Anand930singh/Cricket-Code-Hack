import React from "react";
import "./Home.css";
import RotatingCube from "../../components/RotatingCube/RotatingCube";

function Home() {
  return (
    <div className="home">
      <div className="homeCard">
        <div className="homeBody">
          <div className="leftHomeBody">
            <div className="homeTagLine">
              <div className="line-one">STEP UP YOUR </div>
              <div className="line-two">
                {" "}
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
      </div>
    </div>
  );
}

export default Home;
