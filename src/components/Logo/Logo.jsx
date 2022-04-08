import React from 'react';

import config from '/config';

import './styles.scss';

const Logo = (props) => {
  const { baseClassName = '', className = '' } = props;
  const { version } = config;

  const defaultClassName = 'logo';

  const extendedClassName = `${baseClassName}-${defaultClassName}`;

  const classNames = [defaultClassName, className, extendedClassName].join(' ');

  return (
    <div className={classNames}>
      PTASHKA<sup className="logo-version">v{version}</sup>
    </div>
  );
};

export default Logo;
