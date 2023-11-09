import React from "react";
import "./About.css";
import Question from "../../Images/question.png"
import Solution from "../../Images/jigsaw.png"
import Feature from "../../Images/feature.png"

function About() {
  return (
    <div className="about">
      <div className="aboutTagLine">
        <div className="line-one">
          <span>ABOUT </span> US
        </div>
      </div>
      <div className="aboutBody">
        <div className="aboutDetails">
          <div className="problemStatementCard">
            <div className="cardHead">Problem Statement</div>
            <div className="contentProblem">
              <div className="content">
              The objective is to develop a dynamic and adaptable machine 
              learning model that can predict the performance of cricket players 
              in World Cup matches, across various formats like T20, Test, and 
              One Day matches. This model should consider a wide range of factors, 
              including historical statistics, recent form, pitch conditions, 
              opposition strength, and psychological readiness, to provide 
              data-driven predictions. The model should also account for the 
              rapidly changing nature of cricket matches, taking into consideration 
              variables such as changing weather conditions, form fluctuations, 
              and pitch variations.
              </div>
              <div className="icon">
                <img src={Question} alt="Logo" className="logo" />
              </div>
            </div>
          </div>
          <div className="solutionCard">
            <div className="cardHead">Solution</div>
            <div className="contentSolution">
              <div className="content">
                Our innovative idea integrates a multi-faceted approach to
                predict cricket player performance. By analyzing historical
                weather data, evaluating the strengths and weaknesses of the
                opposition team, and factoring in the unique characteristics of
                the stadium, we aim to offer a comprehensive perspective on
                player performance. Each cricket stadium has its own unique
                pitch and environmental conditions that can significantly impact
                a player's strategy and outcome. Our model takes all these
                variables into account, enabling coaches, players, and
                enthusiasts to make more informed decisions. This holistic
                approach promises to redefine cricket analytics, providing a
                competitive edge that considers not only the players and
                opposition but also the playing field itself.
              </div>
              <div className="icon">
              <img src={Solution} alt="Logo" className="logo" />
              </div>
            </div>
          </div>
          <div className="teamCard">
            <div className="cardHead">Team</div>
            <div className="contentFeature">
              <div className="icon">
              <img src={Feature} alt="Logo" className="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
