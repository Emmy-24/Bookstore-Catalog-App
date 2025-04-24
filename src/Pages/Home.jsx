import React from 'react'
import Hero from '../Components/Hero'
import Recommended from '../Components/Recommended'
import Top from '../Components/Top'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Top/>
      <Recommended/>
    </div>
  );
};

export default Home;