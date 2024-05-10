import React, { useEffect, useState } from "react";
import "./UpcomingMatches.css";
import {Hourglass} from 'react-loader-spinner'

const MyComponent = () => {
  const [matches, setMatches] = useState([]);

  const fetchData = async () => {
    const url =
      "https://unofficial-cricbuzz.p.rapidapi.com/matches/get-schedules?matchType=international";
    const country_code_url = "https://flagcdn.com/en/codes.json";

    let code = await fetch(country_code_url);
    code = await code.json();

    const options = {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '9410983b1dmshf1d5da42cb0b8adp1d2ccejsn578878640b5a',
        'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
    },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result && result.scheduleAdWrapper) {
        const matchDataArray = [];
        result.scheduleAdWrapper.forEach((item) => {
          if (item.matchScheduleMap) {
            let date = item.matchScheduleMap.date;
            item.matchScheduleMap.matchScheduleList.forEach((matche) => {
              let seriesName = matche.seriesName;
              // if (seriesName.includes("ICC")) {
                matche.matchInfo.forEach(async (matchInfo) => {
                  let team1_code, team2_code;
                  let i = 0;

                  for (const cd in code) {
                    if (code[cd] === matchInfo.team1.teamName) {
                      team1_code = cd;
                      i++;
                    }
                    if (code[cd] === matchInfo.team2.teamName) {
                      team2_code = cd;
                      i++;
                    }
                    if (i === 2) {
                      break;
                    }
                  }
                  matchDataArray.push({
                    seriesName: seriesName,
                    date: date,
                    matchId:matchInfo.matchId,
                    matchDesc: matchInfo.matchDesc,
                    startDate: matchInfo.startDate,
                    endDate: matchInfo.endDate,
                    team1ID: matchInfo.team1.teamId,
                    teamName1: matchInfo.team1.teamName,
                    teamSName1: matchInfo.team1.teamSName,
                    teamImageId1: matchInfo.team1.imageId,
                    team2ID: matchInfo.team2.teamId,
                    teamName2: matchInfo.team2.teamName,
                    teamSName2: matchInfo.team2.teamSName,
                    teamImageId2: matchInfo.team2.imageId,
                    venueGround: matchInfo.venueInfo.ground,
                    venueCity: matchInfo.venueInfo.city,
                    team1flagcode: team1_code,
                    team2flagcode: team2_code,
                    matchFormat: matchInfo.matchFormat
                  });
                });
              // }
            });
          }
        });
        console.log(matchDataArray);
        setMatches(matchDataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isMatchLive = (startDate, endDate) => {
    const currentTimestamp = Date.now();
    return startDate <= currentTimestamp && currentTimestamp <= endDate;
  };

  const handleMatchClick = (matchId, team1Id, team2Id) => {
    window.location.href = `/matchdetail/${matchId}/${team1Id}/${team2Id}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="upcomingMatchesPage">
      {matches.length > 0 ? (
        matches.map((match, index) => (
            <div className="upcomingMatches" key={index} onClick={() => handleMatchClick(match.matchId,match.team1ID,match.team2ID)}>
              <div className="seriesName">
                <div className="matchFormat">{match.matchFormat}</div>
                <div className="series">{match.seriesName}</div>
                {isMatchLive(match.startDate, match.endDate) && (
                  <div className="matchStatus">Live</div>
                )}
              </div>
              <div className="matchBetw">
                <div className="team1">
                  <div className="team1Flag">
                    <img
                      src={`https://flagcdn.com/224x168/${match.team1flagcode}.png`}
                      height="17"
                      alt={match.teamName1}
                    />
                  </div>
                  <div className="team1Name">
                    {match.teamName1} ({match.teamSName1})
                  </div>
                </div>
                <div className="vs">VS</div>
                <div className="team2">
                  <div className="team2Flag">
                    <img
                      src={`https://flagcdn.com/224x168/${match.team2flagcode}.png`}
                      height="17"
                      alt={match.teamName1}
                    />
                  </div>
                  <div className="team2Name">
                    {match.teamName2} ({match.teamSName2})
                  </div>
                </div>
              </div>
              <div className="time_venue">
                <div className="time">{match.date}</div>
                <div className="venue">
                  {match.venueGround}, {match.venueCity}
                </div>
              </div>
            </div>
        ))
      ) : (
        <div className="loaderUM">
        <Hourglass
          height="30"
        />
        </div>
      )}
    </div>
  );
};

export default MyComponent;
