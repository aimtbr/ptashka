import React from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';

const HiddenContentCell = (props) => {
  const { baseClassName, className = '', children } = props;

  // const baseClassNameExtended = baseClassName ? `${baseClassName}-cell` : '';
  const baseClassNameExtended = baseClassName ? unifyClassNames(baseClassName, 'cell') : '';

  const classNames = [baseClassNameExtended, className].join(' ');

  return <div className={classNames}>{children}</div>;
};

export default HiddenContentCell;
