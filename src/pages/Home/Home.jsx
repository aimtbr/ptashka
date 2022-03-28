import React from 'react';

import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer';

import './styles.scss';

const Home = () => {
  return (
    <div className="home">
      <Header />

      <Body />

      <Footer />
    </div>
  );
};

export default Home;
