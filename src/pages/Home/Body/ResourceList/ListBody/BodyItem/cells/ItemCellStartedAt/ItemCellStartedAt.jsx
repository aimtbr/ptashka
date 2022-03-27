import React from 'react';

import { ItemCell } from '../../ItemCell';
import { dateToReadable } from '/src/lib/converters.js';

const ItemCellStartedAt = (props) => {
  const { baseClassName, startedAt, locale } = props;

  const className = `${baseClassName}-started-at`;

  const startedAtReadable = dateToReadable(startedAt, locale.code);

  return (
    <ItemCell baseClassName={baseClassName} type="started-at">
      <div className={className}>{startedAtReadable}</div>
    </ItemCell>
  );
};

export default ItemCellStartedAt;
