import React, { useEffect, useState, useMemo, useRef } from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';
import { Ptashka } from '/src/lib/entities';

import { ItemContent } from './ItemContent';
import { ItemDetails } from './ItemDetails';

import './styles.scss';

const BodyItem = (props) => {
  const { baseClassName, resource, deleteResource } = props;

  const itemRef = useRef(null);

  const ptashka = useMemo(() => new Ptashka(resource), []);

  const [data, setData] = useState(ptashka.toJSON());

  const [isCollapsed, setIsCollapsed] = useState(true);

  const className = unifyClassNames(baseClassName, 'item');

  const { url, requestsSent, successRate, status, startedAt } = data;

  // TODO: display a success rate

  useEffect(() => {
    itemRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    ptashka.onchange = (change) => {
      const { key, value } = change;

      setData((data) => ({ ...data, [key]: value }));
    };

    // TEMP DISABLED
    // ptashka.send();

    // return () => {
    //   ptashka.pause();
    // };
  }, []);

  const toggleDetails = () => setIsCollapsed((isCollapsed) => !isCollapsed);

  const toggleItemState = () => {
    if (ptashka.isStatusPaused) {
      ptashka.resume();
    } else {
      ptashka.pause();
    }
  };

  const deleteItem = () => deleteResource(resource);

  return (
    <li
      className={className}
      ref={itemRef}
    >
      <ItemContent
        baseClassName={className}
        url={url}
        isCollapsed={isCollapsed}
        toggleDetails={toggleDetails}
      />

      <ItemDetails
        baseClassName={className}
        requestsSent={requestsSent}
        status={status}
        startedAt={startedAt}
        toggleItemState={toggleItemState}
        deleteItem={deleteItem}
        isHidden={isCollapsed}
      />
    </li>
  );
};

export default BodyItem;
