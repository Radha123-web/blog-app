// src/Home.js
import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import BlogList from './BlogList';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <BlogList />
    </>
  );
};

export default Home;
