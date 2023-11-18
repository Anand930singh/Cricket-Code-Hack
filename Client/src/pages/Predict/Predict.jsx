import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RxCross2 } from "react-icons/rx";
import "./Predict.css";
import PredictedDetail from "../../components/PredictedDetail/PredictedDetail";
import * as tf from '@tensorflow/tfjs';

function Predict() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);

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

  const handlePredictClick = () => {
    setShowPrediction(!showPrediction); // Show prediction result when Predict is clicked
  };

  const predictFromModel=async()=>{
    console.log('hii')
    try{
      const model = await tf.loadLayersModel('./model_bowling_classifications_all.h5');
      console.log('sex')
      const input = tf.tensor([1, 2, 3, 4]);
      const output = model.predict(input);
      const response= output.json();
      console.log(response)
    }
    catch(error){
      console.error('Error loading the model:', error);
    }
  }

  useEffect(()=>{
    predictFromModel();
  },[])

  return (
    <div className="predictMain">
      <div className={`filterForm ${showPrediction ? "blurBackground" : ""}`}>
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
          <button onClick={handlePredictClick}>Predict</button>
        </div>
      </div>
      {showPrediction && ( 
        <div className="predictionResult">
          <PredictedDetail />
          <div className="crossSign">
          <IconContext.Provider
            value={{ color: "rgb(240, 96, 96)", size: "1.5rem", className:"crossIcon"}}
          >
            <RxCross2 onClick={handlePredictClick}/>
          </IconContext.Provider>
        </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
