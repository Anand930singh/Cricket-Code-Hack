import React, { useEffect, useState } from 'react'
import './MatchDetail.css'
import { useParams } from 'react-router-dom';

function MatchDetail() {
  const { matchId, team1Id, team2Id } = useParams();
  const [team1Data, setTeam1Data] = useState();

  const fetchTeam = async (matchId, teamId) => {
    const url = `https://unofficial-cricbuzz.p.rapidapi.com/matches/get-team?matchId=${matchId}&teamId=${teamId}`;
    const options = {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '3e8ef66ca9msh5b1b3703e0f1858p18e899jsn2f40e3f2d1a0',
        'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    console.log(response)
    const result = await response.json();
    console.log(result,'hii')
    setTeam1Data(result);
  }

  useEffect(() => {
    fetchTeam(matchId, team1Id);
  }, []);

  return (
    <div>
      {team1Data ? (
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque facere dolorum architecto numquam velit, vel blanditiis! Nulla iste repellat sapiente quasi amet dicta illo laboriosam, perferendis dignissimos magnam molestias maiores et laborum eaque quo error ipsam perspiciatis accusantium aperiam est? Officia, eius dicta. Harum cum eaque est repellat molestiae ipsam, consectetur veniam unde, illum esse voluptatum quam ut ipsum. Ratione totam sapiente deleniti in molestias at alias eaque error aut assumenda earum et laboriosam, aliquid consequatur. Ut quaerat esse, sit similique, possimus ad placeat tenetur temporibus sapiente distinctio excepturi libero quos reprehenderit nulla deserunt facilis blanditiis illum quis harum dolore?
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default MatchDetail;
