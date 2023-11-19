import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RxCross2 } from "react-icons/rx";
import "./Predict.css";
import PredictedDetail from "../../components/PredictedDetail/PredictedDetail";
import {
  BattersName,
  BowlersName,
  Ground,
  Country,
  PlayersBattersNameMapped,
  PlayersBowlerNameMapped,
} from "../../constants/players";
import * as tf from "@tensorflow/tfjs";
import { BattersRunPrediction } from "../../prediction_model/batters";

function Predict() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [player, setplayer] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [selectedOppositeCountry, setSelectedOppositeCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);
  const [playerCountryDict, setPlayerCountDict] = useState();

  const [playersName, setPlayersname] = useState();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
    if (event.target.value === "Batting") {
      setPlayersname(BattersName);
      setPlayerCountDict(PlayersBattersNameMapped);
    } else {
      setPlayersname(BowlersName);
      setPlayerCountDict(PlayersBowlerNameMapped);
    }
  };

  const handleOptionChange1 = (event) => {
    setplayer(event.target.value);
    setplayer(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleOptionChange3 = (event) => {
    setSelectedStadium(event.target.value);
  };

  const handleOptionChange4 = (event) => {
    setSelectedOppositeCountry(event.target.value);
  };

  const handlePredictClick = () => {
    fetchData('Cape Town',selectedDate)
    setShowPrediction(!showPrediction); 
  };

  const handleDateChange = (event) => {
    console.log(event.target.value)
    setSelectedDate(event.target.value);
  };

  const fetchData= async(place,date)=>{

      const key = '4V83DKENMEVGYTBJGYVLNFV4B';
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Dhaka/${date}/${date}?unitGroup=us&include=days&key=4V83DKENMEVGYTBJGYVLNFV4B&contentType=json`;

      try {
        const response = await fetch(url);
        console.log(url);
        console.log(response,'reskjb')
        if (response) {
          const data = await response.json();
          console.log(data)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

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
  //     const check = tf.tensor1d(new Array(160).fill(0));
  //     const indicesToSetAs1 = [18,153, 139, 62, 19];
  //     indicesToSetAs1.forEach(index => check[index] = 1);
  //     const checkReshaped = check.reshape([1, -1]);
  //     const final = checkReshaped.arraySync();
  //     const predictions = battersModel.predict(tf.tensor2d(final));

  //     console.log(predictions,'predictions')

  //     const maxIndex = predictions.argMax().dataSync()[0];

  //     console.log("Index with maximum predicted value:", maxIndex);
  //     // let zerosReshaped = [zerosArray];
  //     // // replace with actual data

  //     // const inputBatters = tf.tensor(zerosReshaped)
  //     // const predictBatters = battersModel.predict(inputBatters);
  //     // const output = predictBatters.dataSync();

  //     // console.log(output);
  //     console.log('Model is loaded');
  //   }
  //   catch(e)
  //   {
  //     console.log('Error:', e);
  //   }
  // }

  useEffect(()=>{
    BattersRunPrediction();
  },[])

  return (
    <div className="predictMain">
      <div className={`filterForm ${showPrediction ? "blurBackground" : ""}`}>
        <div className="predictionCateg">
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
              value="Batting"
              checked={selectedOption === "Batting"}
              onChange={handleOptionChange}
            />
            Batting
          </label>
        </div>
        <div className="predictionDetail">
          <select value={player} onChange={handleOptionChange1}>
            <option value="">Player Name</option>
            {playersName &&
              playersName.map((player, index) => (
                <option key={index} value={player}>
                  {player}
                </option>
              ))}
          </select>

          <select value={selectedFormat} onChange={handleOptionChange2}>
            <option value="">Match Format</option>
            <option value="OppositeCountry">T20</option>
            <option value="option5">ODI</option>
            <option value="option6">TEST</option>
          </select>

          <select value={selectedStadium} onChange={handleOptionChange3}>
            <option value="">Stadium</option>
            {Ground &&
              Ground.map((ground, index) => (
                <option key={index} value={ground}>
                  {ground}
                </option>
              ))}
          </select>

          <select
            value={selectedOppositeCountry}
            onChange={handleOptionChange4}
          >
            <option value="">Opposition</option>
            {Country &&
              player &&
              Country.map((country, index) => {
                if (country !== playerCountryDict[player].country) {
                  return (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  );
                } else {
                  return null;
                }
              })}
          </select>
          <div className="matchDate">
            <input
              type="date"
              min="2005-01-01"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
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
              value={{
                color: "rgb(240, 96, 96)",
                size: "1.5rem",
                className: "crossIcon",
              }}
            >
              <RxCross2 onClick={handlePredictClick} />
            </IconContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predict;
