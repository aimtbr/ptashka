import React from 'react';
import { Logo } from '/src/components';

const Header = () => {
  const defaultClassName = 'home-header';

  return (
    <header className="home-header">
      <Logo baseClassName={defaultClassName} />
    </header>
  );
};

export default Header;
