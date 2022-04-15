import React from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';

import './styles.scss';

const Anchor = (props) => {
  const { baseClassName = '', className = '', children, ...rest } = props;

  const defaultClassName = 'anchor';

  const baseClassNameUnified = unifyClassNames(baseClassName, defaultClassName);

  const classNames = [defaultClassName, baseClassNameUnified, className].join(' ');

  return (
    <a
      className={classNames}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Anchor;
