import React from 'react';
import { Logo, Greeting } from '/src/components';

const Header = (props) => {
  const { baseClassName } = props;

  const className = `${baseClassName}-header`;

  return (
    <header className={className}>
      <Logo baseClassName={className} />
      <Greeting baseClassName={className} />
    </header>
  );
};

export default Header;
