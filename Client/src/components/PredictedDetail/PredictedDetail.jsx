import React, { useEffect, useState } from "react";
import {Hourglass} from 'react-loader-spinner'
import "./PredictedDetail.css";

function PredictedDetail({minRun,maxRun}) {
  const [playerImage, setPlayerImage] = useState(null);

  const fetchPlayerImage = async(playerName)=>{

    const options = {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': 'f8a00b7e06msh61438fbfb5ca279p1466ebjsn99aec5fe206d',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=${playerName}`;
    let result='';

    try{
      const response = await fetch(url, options);
      result = await response.json();
    }catch(e)
    {
      setPlayerImage('https://cdn-icons-png.flaticon.com/512/3007/3007142.png');
    }

    if(result && result.player)
    {
      const imageId = result.player[0].faceImageId;
      const url2 = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg?p=de&d=high`;

      const response2= await fetch(url2, options);
      const imageData = await response2.blob();
      setPlayerImage(URL.createObjectURL(imageData));
    }
    else{
      setPlayerImage('https://cdn-icons-png.flaticon.com/512/3007/3007142.png')
    }
  }

  useEffect(()=>{
    fetchPlayerImage('Markaram')
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
            <div className="playerName">Virat Kholi</div>

      </div>
      <div className="predictedDate">
        <div className="predictMainHeading">Predicted Data</div>
        <div className="predictModelData">
          <div className="totalRunContainer">
            <div className="predictTitle">Total Run</div>
            <div className="predictValue">{minRun} - {maxRun}</div>
          </div>
          <div className="noSixContainer">
            <div className="predictTitle">Six</div>
            <div className="predictValue">4</div>
          </div>
          <div className="noFoursContainer">
            <div className="predictTitle">Four</div>
            <div className="predictValue">9</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictedDetail;
