import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import UserAcces from '../../images/bank.svg';

const Home = () => (
  <div className="home-section">
    <div className="welcome-page">
      <h1>Welcome To Tricofin</h1>
    </div>
    <div className="banking-logo">
      <img src={UserAcces} alt="Access User Portal" />
      <Link to="/individualcustomerform">Manage Users</Link>
    </div>
  </div>
);

export default Home;
