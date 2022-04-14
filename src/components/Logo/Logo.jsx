import React from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';
import config from '/config';

import './styles.scss';

const Logo = (props) => {
  const { baseClassName = '', className = '' } = props;
  const { version } = config;

  const defaultClassName = 'logo';

  const baseClassNameExtended = unifyClassNames(baseClassName, defaultClassName);

  const classNames = [defaultClassName, baseClassNameExtended, className].join(' ');

  return (
    <div className={classNames}>
      PTASHKA<sup className={unifyClassNames(classNames, 'version')}>v{version}</sup>
    </div>
  );
};

export default Logo;
