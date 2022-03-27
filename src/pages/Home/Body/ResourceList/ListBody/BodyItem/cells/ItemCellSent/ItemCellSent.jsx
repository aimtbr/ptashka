import React from 'react';

import { ItemCell } from '../../ItemCell';

const ItemCellSent = (props) => {
  const { baseClassName, sent } = props;

  const className = `${baseClassName}-sent`;

  // TODO: get it displayed in the format of 2 to the power of n

  return (
    <ItemCell baseClassName={baseClassName} type="sent">
      <div className={className}>{sent}</div>
    </ItemCell>
  );
};

export default ItemCellSent;
