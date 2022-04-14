import React from 'react';

import { HiddenContentCell } from '../../HiddenContentCell';
import { unifyClassNames } from '/src/lib/helpers.js';

const CellSent = (props) => {
  const { baseClassName, requestsSent } = props;

  // const className = `${baseClassName}-cell-sent`;
  const className = unifyClassNames(baseClassName, 'cell-sent');
  const contentClassName = `${className}__content`;

  // TODO: get it displayed in the format of 2 to the power of n

  return (
    <HiddenContentCell
      className={className}
      baseClassName={baseClassName}
    >
      <div className={contentClassName}>{requestsSent}</div>
    </HiddenContentCell>
  );
};

export default CellSent;
