import React, { useEffect, useRef } from 'react';

import {
  DetailSuccessRate,
  DetailRequestsSent,
  DetailStartedAt,
  DetailStateButton,
  DetailDeleteButton,
} from './details';
import { unifyClassNames } from '/src/lib/helpers.js';
import { PTASHKA_STATUS_PAUSED } from '/src/lib/constants.js';

const ItemDetails = (props) => {
  const {
    baseClassName,
    successRate,
    requestsSent,
    status,
    startedAt,
    isHidden,
    toggleItemState,
    deleteItem,
  } = props;

  const detailsRef = useRef();

  useEffect(() => {
    if (!isHidden) {
      scrollToElement();
    }
  }, [isHidden]);

  const className = unifyClassNames(baseClassName, 'details');

  const isStatusPaused = status === PTASHKA_STATUS_PAUSED;

  const scrollToElement = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return isHidden ? null : (
    <div
      className={className}
      ref={detailsRef}
    >
      <DetailSuccessRate
        baseClassName={className}
        successRate={successRate}
      />

      <DetailRequestsSent
        baseClassName={className}
        requestsSent={requestsSent}
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
