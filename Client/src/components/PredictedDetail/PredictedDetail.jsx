import React, { useEffect, useState } from "react";
import "./PredictedDetail.css";

function PredictedDetail() {
  const [playerImageId, setPlayerImageId] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);

  const fetchPlayerData = async (playerData) => {
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=${playerData}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "690bf75957mshdca5001b1b5df2fp1525f7jsnf0f5a639789e",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setPlayerImageId(result);
      console.log(result);
    } catch (error) {
      setPlayerImage(null);
      setPlayerImageId(null);
      console.error(error);
    }
  };

  const fetchPlayerImage = async (imageId) => {
    imageId = playerImageId.player[0].faceImageId;

    const url = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg?p=de&d=high`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "690bf75957mshdca5001b1b5df2fp1525f7jsnf0f5a639789e",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const imageData = await response.blob();
      console.log(URL.createObjectURL(imageData), "hii");
      setPlayerImage(await URL.createObjectURL(imageData));
    } catch (error) {
      console.error(error);
      setPlayerImage("Image not available");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlayerData("Virat");
      const imageId = playerImageId.player[0].faceImageId;
      console.log("hii");
      console.log(imageId);
      if (imageId) {
        await fetchPlayerImage(imageId);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="predictCard">
      <div className="player_card">
        {playerImage ? (
          <div className="xyzImg">
            {/* <img src={playerImage} alt="playerImage" /> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="predictedDate">
        <div className="predictMainHeading">Predicted Data</div>
        <div className="predictModelData">
          <div className="totalRunContainer">
            <div className="predictTitle">Total Run</div>
            <div className="predictValue">93</div>
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
