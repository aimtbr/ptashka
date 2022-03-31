import React from 'react';
import { Logo, Greeting } from '/src/components';

const Header = () => {
  const defaultClassName = 'home-header';

  return (
    <header className="home-header">
      <Logo baseClassName={defaultClassName} />
      <Greeting baseClassName={defaultClassName} />
    </header>
  );
};

export default Header;
