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
  CountryIndexing,
  ConditionIndexing,
  GroundIndexing,
  FormatIndexing,
  BowlGround,
  BowlerGround,
  BowlOpp,
  BowlCondition,
  BowlFormat,
  BowlOppCountry,
} from "../../constants/players";
import * as tf from "@tensorflow/tfjs";
import {
  BattersRunPrediction,
  BattersFoursPrediction,
} from "../../prediction_model/batters";
import { BowlingPrediction, BowlingWicketPrediction } from "../../prediction_model/bowling";
import PredictBowlerDetail from "../../components/PredictBowlerDetail/PredictBowlerDetail";

function Predict() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [player, setplayer] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [selectedOppositeCountry, setSelectedOppositeCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const [playerCountryDict, setPlayerCountDict] = useState();
  const [playersName, setPlayersname] = useState();
  const [predictedRun, setPredictedRun] = useState();
  const [predictedFours, setPredictedFours] = useState();
  const [predictedSixes, setPredictedSixes] = useState();
  const [condition, setCondition] = useState();
  const [predictedWicket, setPredictedWicket] = useState();

  //option maping constants
  const [stadium, setStadium] = useState();
  const [opposition, setOpposition] = useState();

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
    if (event.target.value === "Batting") {
      setPlayersname(BattersName);
      setStadium(Ground);
      setOpposition(Country);
      setPlayerCountDict(PlayersBattersNameMapped);
    } else {
      setPlayersname(BowlersName);
      setStadium(BowlerGround);
      setOpposition(BowlOppCountry);
      setPlayerCountDict(PlayersBowlerNameMapped);
    }
  };

  const handleOptionChange1 = (event) => {
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

  const handlePredictClick = async () => {
    if (showPrediction === false) {
      const dataCond = await fetchData(selectedStadium, selectedDate);
      if (selectedOption === "Batting") {
        const dataRun = await BattersRunPrediction(
          PlayersBattersNameMapped[player].index,
          CountryIndexing[selectedOppositeCountry],
          ConditionIndexing[dataCond.conditions],
          GroundIndexing[selectedStadium],
          FormatIndexing[selectedFormat]
        );
        const dataFours = await BattersFoursPrediction(
          PlayersBattersNameMapped[player].index,
          CountryIndexing[selectedOppositeCountry],
          ConditionIndexing[dataCond.conditions],
          GroundIndexing[selectedStadium],
          FormatIndexing[selectedFormat]
        );

        setPredictedRun(dataRun);
        setPredictedFours(dataFours);
        setPredictedSixes(dataFours);
      } else {
        console.log(dataCond, BowlCondition[dataCond.conditions], "condition");
        const bowRun = await BowlingPrediction(
          PlayersBowlerNameMapped[player].index,
          BowlGround[selectedStadium],
          BowlCondition[dataCond.conditions],
          BowlOpp[selectedOppositeCountry],
          BowlFormat[selectedFormat],
          dataCond.humidity,
          dataCond.temp,
          dataCond.windspeed
        );
        const bowWicket = await BowlingWicketPrediction( PlayersBowlerNameMapped[player].index,
          BowlGround[selectedStadium],
          BowlCondition[dataCond.conditions],
          BowlOpp[selectedOppositeCountry],
          BowlFormat[selectedFormat],
          dataCond.humidity,
          dataCond.temp,
          dataCond.windspeed)
        setPredictedRun(bowRun);
        setPredictedWicket(bowWicket)
      }
    }
    else{
      window.location.reload();
    }
    setShowPrediction(!showPrediction);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setSelectedDate(event.target.value);
  };

  const fetchData = async (place, date) => {
    const key = "4V83DKENMEVGYTBJGYVLNFV4B";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/${date}/${date}?unitGroup=us&include=days&key=4V83DKENMEVGYTBJGYVLNFV4B&contentType=json`;

    try {
      const response = await fetch(url);
      console.log(url);
      console.log(response, "reskjb");
      if (response) {
        const data = await response.json();
        setCondition(data.days[0].conditions);
        console.log(data);
        return data.days[0];
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            <option value="T20I">T20I</option>
            <option value="ODI">ODI</option>
            <option value="TEST">TEST</option>
          </select>

          <select value={selectedStadium} onChange={handleOptionChange3}>
            <option value="">Stadium</option>
            {stadium &&
              stadium.map((ground, index) => (
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
            {opposition &&
              player &&
              opposition.map((opp, index) => {
                if (opp !== playerCountryDict[player].country) {
                  return (
                    <option key={index} value={opp}>
                      {opp}
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
      {showPrediction && predictedRun && (
        <div className="predictionResult">
          {selectedOption === "Batting" ? (
            <PredictedDetail
              playerName={player}
              minRun={predictedRun.min}
              maxRun={predictedRun.max}
              minFour={predictedFours.min}
              maxFour={predictedFours.max}
              minSix={predictedSixes.min}
              maxSix={predictedSixes.max}
            />
          ) : (
            <PredictBowlerDetail 
              playerName={player}
              minRun={predictedRun.min}
              maxRun={predictedRun.max}
              minWick={predictedWicket.min}
              maxWick={predictedWicket.max}
            />
          )}
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
