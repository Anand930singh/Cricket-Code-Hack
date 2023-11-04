import React from "react";
import "./RotatingCube.scss";
import { BiCricketBall } from "react-icons/bi";
import { TbCricket } from "react-icons/tb";
import { MdStadium } from "react-icons/md";
import {
  PiNumberSquareSixBold,
  PiNumberSquareFourDuotone,
} from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";

function RotatingCube() {
  return (
    <div>
      <div className="stage-cube-cont">
        <div className="cubespinner">
          <div className="face1">
            <BiCricketBall color="red" />
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
  );
}

export default RotatingCube;
