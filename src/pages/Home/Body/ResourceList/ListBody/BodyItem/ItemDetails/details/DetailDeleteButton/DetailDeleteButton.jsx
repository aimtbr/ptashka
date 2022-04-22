import React from 'react';

import { Detail } from '../../Detail';
import { Button, Icon } from '/src/components';
import { unifyClassNames } from '/src/lib/helpers.js';

import crossIcon from '/assets/icons/cross.svg';

const DetailDeleteButton = (props) => {
  const { baseClassName, onClick } = props;

  // const className = `${baseClassName}-cell-delete`;
  const className = unifyClassNames(baseClassName, 'detail-delete');
  const contentClassName = `${className}-content`;

  return (
    <Detail
      className={className}
      baseClassName={baseClassName}
    >
      <Button
        className={contentClassName}
        title="Видалити процес"
        // title="Delete the process"
        onClick={onClick}
      >
        <Icon icon={crossIcon} />
      </Button>
    </Detail>
  );
};

export default DetailDeleteButton;
