import React from 'react';

import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '/src/lib/constants.js';

const ResourceItemStatus = (props) => {
  const { className, status } = props;

  const getStatusClassName = () => {
    const statuses = {
      [PTASHKA_STATUS_READY]: `${className}_ready`,
      [PTASHKA_STATUS_RUNNING]: `${className}_running`,
      [PTASHKA_STATUS_PAUSED]: `${className}_paused`,
    };

    const statusClassName = statuses[status];

    return statusClassName;
  };

  const statusClassNames = [className, getStatusClassName()];

  return <div className={statusClassNames}>{status}</div>;
};

export default ResourceItemStatus;
