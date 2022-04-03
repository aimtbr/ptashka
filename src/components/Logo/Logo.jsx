import React from 'react';

import './styles.scss';

const Logo = (props) => {
  const { baseClassName = '', className = '' } = props;
  const { APP_VERSION } = process.env;

  const defaultClassName = 'logo';

  const extendedClassName = `${baseClassName}-${defaultClassName}`;

  const classNames = [defaultClassName, className, extendedClassName].join(' ');

  return (
    <div className={classNames}>
      PTASHKA<sup className="logo-version">v{APP_VERSION}</sup>
    </div>
  );
};

export default Logo;
