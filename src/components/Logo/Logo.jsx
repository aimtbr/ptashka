import React from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';

import './styles.scss';

const Logo = (props) => {
  const { baseClassName = '', className = '' } = props;

  const defaultClassName = 'logo';

  const baseClassNameUnified = unifyClassNames(baseClassName, defaultClassName);

  const classNames = [defaultClassName, baseClassNameUnified, className].join(' ');

  return <div className={classNames}>PTASHKA</div>;
};

export default Logo;
