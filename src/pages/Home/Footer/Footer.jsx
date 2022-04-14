import React from 'react';

const Footer = (props) => {
  const { baseClassName } = props;

  const className = `${baseClassName}-footer`;

  return <footer className={className}></footer>;
};

export default Footer;
