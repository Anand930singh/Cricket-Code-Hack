import React from 'react';
import './Home.css';
import background from '../../Images/back.jpg';

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
  };

  return (
    <div className='homeMain'>
      <div className='background' style={backgroundStyle}></div>
    </div>
  );
}

export default Home;
