import React from 'react';

import { CellSent, CellStatus, CellStartedAt, CellState, CellDelete } from './cells';
import { unifyClassNames } from '/src/lib/helpers.js';
import { PTASHKA_STATUS_PAUSED } from '/src/lib/constants.js';

const ItemHiddenContent = (props) => {
  const { baseClassName, requestsSent, status, startedAt, isHidden, toggleItemState, deleteItem } =
    props;

  const className = unifyClassNames(baseClassName, 'hidden');

  const isStatusPaused = status === PTASHKA_STATUS_PAUSED;

  return isHidden ? null : (
    <div className={className}>
      <CellSent
        baseClassName={className}
        requestsSent={requestsSent}
      />

      <CellStatus
        baseClassName={className}
        status={status}
      />

      <CellStartedAt
        baseClassName={className}
        startedAt={startedAt}
      />

      <CellState
        baseClassName={className}
        isStatusPaused={isStatusPaused}
        onClick={toggleItemState}
      />

      <CellDelete
        baseClassName={className}
        startedAt={startedAt}
        onClick={deleteItem}
      />
    </div>
  );
};

export default ItemHiddenContent;
