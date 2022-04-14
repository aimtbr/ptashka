import React from 'react';

import { HiddenContentCell } from '../../HiddenContentCell';
import { dateToReadable } from '/src/lib/converters.js';
import { unifyClassNames } from '/src/lib/helpers.js';

const CellStartedAt = (props) => {
  const { baseClassName, startedAt, locale } = props;

  // const className = `${baseClassName}-cell-started-at`;
  const className = unifyClassNames(baseClassName, 'cell-started-at');
  const contentClassName = `${className}__content`;

  const startedAtReadable = dateToReadable(startedAt, locale.code);

  return (
    <HiddenContentCell
      className={className}
      baseClassName={baseClassName}
    >
      <div className={contentClassName}>{startedAtReadable}</div>
    </HiddenContentCell>
  );
};

export default CellStartedAt;
