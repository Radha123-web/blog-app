import React from 'react';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
const Hero = () => (
  <section className="hero">
    <h1>Welcome to Our Blog</h1>
    <p>Discover amazing stories, insights, and knowledge shared by our community of writers</p>
    <div className="hero-buttons">
      <Link to ="/signup"><button className="join-btn">Join Our Community</button></Link>
      <Link to ='/login'><button className="write-btn">Start Writing</button></Link>
    </div>
  </section>
);
     

export default Hero;
