import React from 'react';

import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer';

import './styles.scss';

const Home = () => {
  const className = 'home';

  return (
    <div className={className}>
      <Header baseClassName={className} />

      <Body baseClassName={className} />

      <Footer baseClassName={className} />
    </div>
  );
};

export default Home;
