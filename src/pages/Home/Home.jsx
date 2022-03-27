import React from 'react';

import { Body } from './Body';

import './styles.scss';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-header-heading">PTASHKA</h1>
      </header>

      <Body />

      <footer className="home-footer"></footer>
    </div>
  );
};

export default Home;
