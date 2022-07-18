import React from 'react';
import IntroSlider from '../../components/IntroSlider';

import './Home.scss';

const Home = () => {
  return (
    <>
      <div className="intro">
        <div className="container">
          <IntroSlider />
        </div>
      </div>
    </>
  );
};

export default Home;
