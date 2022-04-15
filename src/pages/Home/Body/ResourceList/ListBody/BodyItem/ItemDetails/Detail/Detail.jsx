import React from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';

const Detail = (props) => {
  const { baseClassName, className = '', children } = props;

  // const baseClassNameUnified = baseClassName ? `${baseClassName}-cell` : '';
  const baseClassNameUnified = baseClassName ? unifyClassNames(baseClassName, 'cell') : '';

  const classNames = [baseClassNameUnified, className].join(' ');

  return <div className={classNames}>{children}</div>;
};

export default Detail;
