import React from 'react';
import './Offers.css'
import {SlPresent} from 'react-icons/sl';

const Offers = () => {
    return (
        <>
            <div className='card'>
                <i className='present'><SlPresent /></i>
                <div className='offers'>  
                    <h1>Coming Soon . . . .</h1>
                </div>  
            </div>
        </>
         
    )
}

export default Offers