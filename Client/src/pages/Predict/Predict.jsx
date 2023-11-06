import React, { useState } from "react";
import "./Predict.css";

function Predict() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOptionChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const handleOptionChange4 = (event) => {
    setSelectedOption4(event.target.value);
  };

  return (
    <div className="predictMain">
      <div className="filterForm">
        <div className="predictionCateg">
          <label>
            <input
              type="radio"
              name="predictionOption"
              value="Baitting"
              checked={selectedOption === "Baitting"}
              onChange={handleOptionChange}
            />
            Batting
          </label>
          <label>
            <input
              type="radio"
              name="predictionOption"
              value="Bowling"
              checked={selectedOption === "Bowling"}
              onChange={handleOptionChange}
            />
            Bowling
          </label>
          <label>
            <input
              type="radio"
              name="predictionOption"
              value="Fielding"
              checked={selectedOption === "Fielding"}
              onChange={handleOptionChange}
            />
            Fielding
          </label>
        </div>
        <div className="predictionDetail">
          <select value={selectedOption1} onChange={handleOptionChange1}>
            <option value="">Player Name</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <select value={selectedOption2} onChange={handleOptionChange2}>
            <option value="">Match Format</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            <option value="option6">Option 6</option>
          </select>

          <select value={selectedOption3} onChange={handleOptionChange3}>
            <option value="">Stadium</option>
            <option value="option7">Option 7</option>
            <option value="option8">Option 8</option>
            <option value="option9">Option 9</option>
          </select>

          <select value={selectedOption4} onChange={handleOptionChange4}>
            <option value="">Opposition</option>
            <option value="option10">Option 10</option>
            <option value="option11">Option 11</option>
            <option value="option12">Option 12</option>
          </select>
        </div>
        <div className="predictionButton">
          <a href="kh">Predict</a>
        </div>
      </div>
    </div>
  );
}

export default Predict;
