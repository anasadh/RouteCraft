import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center h-screen mx-56 gap-9 text-center'>
      <h1 className='font-extrabold text-[50px]'>
        <span className='text-[#ffffff]'>Unleash Your Wanderlust with AI:</span> 
        <br /> Custom Travel Itineraries Just for You
      </h1>
      
      <p className='text-xl text-gray-500'>
        Your ultimate trip planner and travel guide, crafting personalized itineraries that match your vibe, interests, and budget effortlessly — all for free!
      </p>
      
      <Link to={'/create-trip'}>
        <Button>Begin Your Adventure</Button>
      </Link>
      
      {/* <img src='/public/background.png' className='-mt-20' /> */}
    </div>
  );
}

export default Hero;
