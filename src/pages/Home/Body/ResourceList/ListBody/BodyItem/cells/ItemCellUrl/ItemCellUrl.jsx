import React from 'react';

import { Anchor } from '/src/components';
import { ItemCell } from '../../ItemCell';

const ItemCellUrl = (props) => {
  const { baseClassName, url } = props;

  const className = `${baseClassName}-url`;

  return (
    <ItemCell baseClassName={baseClassName} type="url">
      <Anchor className={className} target="_blank" href={url}>
        {url}
      </Anchor>
    </ItemCell>
  );
};

export default ItemCellUrl;
