import React from 'react';

import './styles.scss';

const Logo = (props) => {
  const { baseClassName = '', className = '' } = props;

  const defaultClassName = 'logo';

  const extendedClassName = `${baseClassName}-${defaultClassName}`;

  const classNames = [defaultClassName, className, extendedClassName].join(' ');

  return <div className={classNames}>PTASHKA</div>;
};

export default Logo;
