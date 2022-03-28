import React from 'react';

import { Anchor } from '/src/components';
import { urlToReadable } from '/src/lib/converters.js';
import { ItemCell } from '../../ItemCell';

const ItemCellUrl = (props) => {
  const { baseClassName, url } = props;

  const className = `${baseClassName}-url`;

  const urlReadable = urlToReadable(url);

  return (
    <ItemCell baseClassName={baseClassName} type="url">
      <Anchor className={className} target="_blank" href={url}>
        {urlReadable}
      </Anchor>
    </ItemCell>
  );
};

export default ItemCellUrl;
