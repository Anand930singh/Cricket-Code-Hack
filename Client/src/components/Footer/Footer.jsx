
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import "./Footer.css";
import React from "react"

function Footer() {
  return (
 
    <div className="bottomCont">
      <div className="bottom">
        <ul className="social">
          <li>
            <BsFacebook size="40" />
          </li>
          <li>
            <BsTwitter size="40" />
          </li>
          <li>
            <BsInstagram size="40" />
          </li>
          <li>
            <BsYoutube size="40" />
          </li>
        </ul>
        <ul className="line-two2">
          <li>About</li>
          <li>Need Help?</li>
          <li>Contact</li>
          <li>Privacy</li>
          <li>Terms of use</li>
          <li>Advertising</li>
          <li>Partners</li>
        </ul>

        <p>© CricketCodeHack. All rights reserved</p>
      </div>
      </div>
  )
}

export default Footer