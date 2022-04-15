import React from 'react';

import { Button, Icon } from '/src/components';
import { Detail } from '../../Detail';
import { unifyClassNames } from '/src/lib/helpers.js';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';

const DetailStateButton = (props) => {
  const { baseClassName, isStatusPaused, onClick } = props;

  const className = unifyClassNames(baseClassName, 'detail-state');
  const contentClassName = `${className}__content`;

  const stateTitle = isStatusPaused
    ? // ? "Resume the process"
      'Відновити процес'
    : // : "Pause the process"
      'Призупинити процес';
  const stateIcon = isStatusPaused ? playIcon : pauseIcon;

  return (
    <Detail
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
    </Detail>
  );
};

export default DetailStateButton;
