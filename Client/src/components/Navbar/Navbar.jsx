import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import './Navbar.css'


function Navbar() {
  return (
    <div className="nav-bar">
        <Link className="logo" to="/" >
            Logo  
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" className="offers-link" to="/offers">
              Offers
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                Contact
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                About
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="features-link" to="/features">
                Features
            </NavLink>

        </nav>
    </div>
     
    
  )
}

export default Navbar