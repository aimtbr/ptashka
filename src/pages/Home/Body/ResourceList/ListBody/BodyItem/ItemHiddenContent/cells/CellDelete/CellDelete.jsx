import React from 'react';

import { HiddenContentCell } from '../../HiddenContentCell';
import { Button, Icon } from '/src/components';
import { unifyClassNames } from '/src/lib/helpers.js';

import bombIcon from '/assets/icons/bomb.svg';

const CellDelete = (props) => {
  const { baseClassName, onClick } = props;

  // const className = `${baseClassName}-cell-delete`;
  const className = unifyClassNames(baseClassName, 'cell-delete');
  const contentClassName = `${className}__content`;

  return (
    <HiddenContentCell
      className={className}
      baseClassName={baseClassName}
    >
      <Button
        className={contentClassName}
        title="Видалити процес"
        // title="Delete the process"
        onClick={onClick}
      >
        <Icon icon={bombIcon} />
      </Button>
    </HiddenContentCell>
  );
};

export default CellDelete;
