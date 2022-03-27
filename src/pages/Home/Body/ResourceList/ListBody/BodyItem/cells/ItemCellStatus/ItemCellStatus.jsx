import React from 'react';

import { ItemCell } from '../../ItemCell';
import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '/src/lib/constants.js';

const ItemCellStatus = (props) => {
  const { baseClassName, status } = props;

  const className = `${baseClassName}-status`;

  const getClassNameModifier = () => {
    const statuses = {
      [PTASHKA_STATUS_READY]: `${className}_ready`,
      [PTASHKA_STATUS_RUNNING]: `${className}_running`,
      [PTASHKA_STATUS_PAUSED]: `${className}_paused`,
    };

    const classNameModifier = statuses[status];

    return classNameModifier;
  };

  const classNames = [className, getClassNameModifier()].join(' ');

  return (
    <ItemCell baseClassName={baseClassName} type="status">
      <div className={classNames}>{status}</div>
    </ItemCell>
  );
};

export default ItemCellStatus;
