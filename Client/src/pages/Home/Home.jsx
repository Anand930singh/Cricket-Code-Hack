import React from 'react';
import './Home.css';
import './Home.scss'

import{BiCricketBall} from 'react-icons/bi' 
import{TbCricket} from 'react-icons/tb'
import{MdStadium} from 'react-icons/md'
import{PiNumberSquareSixBold, PiNumberSquareFourDuotone} from 'react-icons/pi'
import{GiTrophyCup} from 'react-icons/gi'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Home() {

  return (
    <div className='home'>
      <Navbar/>
      <div className="homeBody">
        <div className="leftHomeBody"></div>
        <div className="rightHomeBody">
        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
            <BiCricketBall color="red"/>
            </div>
            <div className="face2">
              <TbCricket />
            </div>
            <div className="face3">
              <MdStadium />
            </div>
            <div className="face4">
              <PiNumberSquareSixBold />
            </div>
            <div className="face5">
              <PiNumberSquareFourDuotone />
            </div>
            <div className="face6">
              <GiTrophyCup />
            </div>
          </div>
          </div>
        </div>
      
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
