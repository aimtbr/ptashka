import React from 'react';

import { HiddenContentCell } from '../../HiddenContentCell';
import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '/src/lib/constants.js';
import { unifyClassNames } from '/src/lib/helpers.js';

const CellStatus = (props) => {
  const { baseClassName, status } = props;

  // const className = `${baseClassName}-cell-status`;
  const className = unifyClassNames(baseClassName, 'cell-status');
  const contentClassName = `${className}__content`;

  const getClassNameModifier = () => {
    const modifiers = {
      [PTASHKA_STATUS_READY]: `${className}_ready`,
      [PTASHKA_STATUS_RUNNING]: `${className}_running`,
      [PTASHKA_STATUS_PAUSED]: `${className}_paused`,
    };

    const classNameModifier = modifiers[status];

    return classNameModifier;
  };

  const classNames = [className, getClassNameModifier()].join(' ');

  return (
    <HiddenContentCell
      className={classNames}
      baseClassName={baseClassName}
    >
      <div className={contentClassName}>{status}</div>
    </HiddenContentCell>
  );
};

export default CellStatus;
