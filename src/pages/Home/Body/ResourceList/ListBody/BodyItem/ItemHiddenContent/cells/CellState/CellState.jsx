import React from 'react';

import { Button, Icon } from '/src/components';
import { HiddenContentCell } from '../../HiddenContentCell';
import { unifyClassNames } from '/src/lib/helpers.js';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';

const CellState = (props) => {
  const { baseClassName, isStatusPaused, onClick } = props;

  // const className = `${baseClassName}-cell-state`;
  const className = unifyClassNames(baseClassName, 'cell-state');
  const contentClassName = `${className}__content`;

  const stateTitle = isStatusPaused
    ? // ? "Resume the process"
      'Відновити процес'
    : // : "Pause the process"
      'Призупинити процес';
  const stateIcon = isStatusPaused ? playIcon : pauseIcon;

  return (
    <HiddenContentCell
      className={className}
      baseClassName={baseClassName}
    >
      <Button
        className={contentClassName}
        title={stateTitle}
        onClick={onClick}
      >
        <Icon icon={stateIcon} />
      </Button>
    </HiddenContentCell>
  );
};

export default CellState;
