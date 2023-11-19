import React, { useEffect, useState } from "react";
import {Hourglass} from 'react-loader-spinner'
import "./PredictedDetail.css";
import { playersIndexing } from "../../constants/players";


function PredictBowlerDetail({playerName, minRun,maxRun, minWick, maxWick}) {
  const [playerImage, setPlayerImage] = useState(null);
  
    const fetchPlayerImage = async(imageId)=>{
  
      const options = {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': 'ab4f5d7ea0msheba8b9ed589ea3bp1a8e40jsne0e04433e4de',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
         }
      };
      console.log('hii')
      try{
  
        console.log(imageId,'imageId')
        const url2 = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/${imageId}/i.jpg?p=de&d=high`;
  
        const response2= await fetch(url2, options);
        const imageData = await response2.blob();
        setPlayerImage(URL.createObjectURL(imageData));
      }
      catch(e){
        setPlayerImage('https://cdn-icons-png.flaticon.com/512/3007/3007142.png')
      }
    }
  
    useEffect(()=>{
      setPlayerImage(null)
      fetchPlayerImage(playersIndexing[playerName])
    },[])
  
  return (
    <div className="predictCard">
      <div className="player_card">
        {playerImage ? (
          <div className="xyzImg">
            <img src={playerImage} alt="Not Found" />
          </div>
        ) : (
          <div>
            <Hourglass
          height="30"
        />
          </div>
        )}
            <div className="playerName">{playerName}</div>

      </div>
      <div className="predictedDate">
        <div className="predictMainHeading">Predicted Data of Bowler</div>
        <div className="predictModelData">
          <div className="totalRunContainer">
            <div className="predictTitle">Total Run</div>
            <div className="predictValue">{minRun} - {maxRun}</div>
          </div>
          <div className="noSixContainer">
            <div className="predictTitle">Wickets</div>
            <div className="predictValue">{minWick} - {maxWick}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictBowlerDetail;
