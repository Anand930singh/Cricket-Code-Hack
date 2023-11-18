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

  // const predictFromModel = async () => {
  //   try {
  //     const model = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/model.json');
      
  //     const input = tf.tensor([
  //       [ // This array represents a single data point/sample
  //         // Add hardcoded values for each column in your dataset
  //         // Example values are provided, replace them with your actual test data
  //         0,          // Player ID or categorical values for Player
  //         4,         // Overs
  //         1,         // Runs
  //         1,          // Wkts
  //         55,         // temp
  //         84.8,         // humidity
  //         22.9,         // windspeed
  //         // ... (fill in values for all Ground columns)
  //         0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  //         // ... (fill in values for all conditions columns)
  //         0,0,0,0,0,0,1,0,0,0,0,
  //         // ... (fill in values for all opposition columns)
  //         0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  //         1,0,0
  //       ]
  //     ]);
      
  //     const predictions = model.predict(input);
  //     //lal kuch kuch karega
  //     const out = predictions.dataSync();
  //     let maxVal = 0;
  //     for (let i = 1; i < predictions.length; i++) {
  //       if (!isNaN(predictions[i]) && predictions[i] > maxVal) {
  //           maxVal = i;
  //       }
  //   }

  //   //lal kar dega
    
  //   console.log('Maximum value:', maxVal);

  //     // console.log(prediction.dataSync()); // Retrieve prediction results
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

  // useEffect(()=>{
  //   predictFromModel();
  // },[])


  //batters model

  // const battersPrediction=async()=>{
  //   try{
  //     console.log('hii')
  //     const battersModel = await tf.loadLayersModel(process.env.PUBLIC_URL + 'model/batters/model.json');

  //     //dummy data filled with zeros
  //     let zerosArray = new Array(130).fill(0);
  //     let zerosReshaped = [zerosArray];
  //     // replace with actual data

  //     const inputBatters = tf.tensor(zerosReshaped)
  //     const predictBatters = battersModel.predict(inputBatters);
  //     const output = predictBatters.dataSync();

  //     console.log(output);
  //     console.log('Model is loaded');
  //   }
  //   catch(e)
  //   {
  //     console.log('Error:', e);
  //   }
  // }

  // useEffect(()=>{
  //   battersPrediction();
  // },[])

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
