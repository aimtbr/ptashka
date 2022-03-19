import React from 'react';

import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '/src/lib/constants.js';

const ResourceItemStatus = (props) => {
  const { className, status } = props;

  const statusClassName = `${className}__status`;

  const getStatusModifier = () => {
    const statuses = {
      [PTASHKA_STATUS_READY]: `${statusClassName}_ready`,
      [PTASHKA_STATUS_RUNNING]: `${statusClassName}_running`,
      [PTASHKA_STATUS_PAUSED]: `${statusClassName}_paused`,
    };

    const statusClassNameModifier = statuses[status];

    return statusClassNameModifier;
  };

  const statusClassNames = [statusClassName, getStatusModifier()].join(' ');

  return <div className={statusClassNames}>{status}</div>;
};

export default ResourceItemStatus;
