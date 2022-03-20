import React from 'react';

import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '/src/lib/constants.js';

const ResourceItemStatus = (props) => {
  const { className, status } = props;

  const defaultClassName = `${className}__status`;

  const getClassNameModifier = () => {
    const modifiers = {
      [PTASHKA_STATUS_READY]: `${defaultClassName}_ready`,
      [PTASHKA_STATUS_RUNNING]: `${defaultClassName}_running`,
      [PTASHKA_STATUS_PAUSED]: `${defaultClassName}_paused`,
    };

    const classNameModifier = modifiers[status];

    return classNameModifier;
  };

  const classNames = [defaultClassName, getClassNameModifier()].join(' ');

  return <div className={classNames}>{status}</div>;
};

export default ResourceItemStatus;
