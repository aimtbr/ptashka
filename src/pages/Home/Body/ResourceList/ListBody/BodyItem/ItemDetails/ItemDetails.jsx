import React from 'react';

import {
  DetailRequestsSent,
  DetailStatus,
  DetailStartedAt,
  DetailStateButton,
  DetailDeleteButton,
} from './details';
import { unifyClassNames } from '/src/lib/helpers.js';
import { PTASHKA_STATUS_PAUSED } from '/src/lib/constants.js';

const ItemDetails = (props) => {
  const { baseClassName, requestsSent, status, startedAt, isHidden, toggleItemState, deleteItem } =
    props;

  const className = unifyClassNames(baseClassName, 'details');

  const isStatusPaused = status === PTASHKA_STATUS_PAUSED;

  return isHidden ? null : (
    <div className={className}>
      <DetailRequestsSent
        baseClassName={className}
        requestsSent={requestsSent}
      />

      <DetailStatus
        baseClassName={className}
        status={status}
      />

      <DetailStartedAt
        baseClassName={className}
        startedAt={startedAt}
      />

      <DetailStateButton
        baseClassName={className}
        isStatusPaused={isStatusPaused}
        onClick={toggleItemState}
      />

      <DetailDeleteButton
        baseClassName={className}
        startedAt={startedAt}
        onClick={deleteItem}
      />
    </div>
  );
};

export default ItemDetails;
