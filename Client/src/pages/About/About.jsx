import React from 'react';
import './About.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function About() {
  return (
    <div className="about">
      <Navbar />
        <div className="aboutTagLine">
            <div className="line-one"><span>ABOUT </span> US</div>
        </div>
        <div className="aboutBody">
        <div className="aboutDetails">
            <div className="problemStatementCard">
                <div className="headProblem">
                    Problem Statement
                </div>
                <div className="contentProblem">
                    <div className="content">
            Our innovative idea integrates a multi-faceted approach to predict cricket player performance. By analyzing historical weather data, evaluating the strengths and weaknesses of the opposition team, and factoring in the unique characteristics of the stadium, we aim to offer a comprehensive perspective on player performance. Each cricket stadium has its own unique pitch and environmental conditions that can significantly impact a player's strategy and outcome. Our model takes all these variables into account, enabling coaches, players, and enthusiasts to make more informed decisions. This holistic approach promises to redefine cricket analytics, providing a competitive edge that considers not only the players and opposition but also the playing field itself.
                    </div>
                    <div className="icon"></div>
                </div>
            </div>
            <div className="problemStatementCard">
                <div className="headProblem">
                    Solution
                </div>
                <div className="contentProblem">
                    <div className="content">
            Our innovative idea integrates a multi-faceted approach to predict cricket player performance. By analyzing historical weather data, evaluating the strengths and weaknesses of the opposition team, and factoring in the unique characteristics of the stadium, we aim to offer a comprehensive perspective on player performance. Each cricket stadium has its own unique pitch and environmental conditions that can significantly impact a player's strategy and outcome. Our model takes all these variables into account, enabling coaches, players, and enthusiasts to make more informed decisions. This holistic approach promises to redefine cricket analytics, providing a competitive edge that considers not only the players and opposition but also the playing field itself.
                    </div>
                    <div className="icon"></div>
                </div>
            </div>
        </div>

        </div>

    {/* <div className="aboutCard">
      <div className="aboutBody">
        <div className="aboutTagLine">
            <div className="line-one"><span>ABOUT </span> US</div>
        </div>
        <div className="idea">Idea </div>
        <div className="para">
            <p>
            Our innovative idea integrates a multi-faceted approach to predict cricket player performance. By analyzing historical weather data, evaluating the strengths and weaknesses of the opposition team, and factoring in the unique characteristics of the stadium, we aim to offer a comprehensive perspective on player performance. Each cricket stadium has its own unique pitch and environmental conditions that can significantly impact a player's strategy and outcome. Our model takes all these variables into account, enabling coaches, players, and enthusiasts to make more informed decisions. This holistic approach promises to redefine cricket analytics, providing a competitive edge that considers not only the players and opposition but also the playing field itself.
            </p>
        </div>
      </div>
    </div> */}
      <Footer />
    </div>
  );
}

export default About;
