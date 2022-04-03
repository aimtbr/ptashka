import React, { useEffect, useState, useMemo, useRef } from 'react';

import { Ptashka } from '/src/lib/entities';
import { Button, Icon } from '/src/components';
import { ItemCell } from './ItemCell';
import {
  ItemCellSent,
  ItemCellStatus,
  ItemCellStartedAt,
  ItemCellUrl,
} from './cells';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';
import bombIcon from '/assets/icons/bomb.svg';

import './styles.scss';

const BodyItem = (props) => {
  const { baseClassName, resource, deleteResource } = props;

  const className = `${baseClassName}-item`;
  const contentClassName = `${className}-content`;

  const itemRef = useRef(null);

  const ptashka = useMemo(() => new Ptashka(resource), []);

  const [data, setData] = useState(ptashka.toJSON());

  const { url, requestsSent, successRate, status, startedAt } = data;

  // TODO: display a success rate

  const stateTitle = ptashka.isStatusPaused
    ? // ? "Resume the process"
      'Відновити процес'
    : // : "Pause the process"
      'Призупинити процес';
  const stateIcon = ptashka.isStatusPaused ? playIcon : pauseIcon;

  useEffect(() => {
    itemRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    ptashka.onchange = (change) => {
      const { key, value } = change;

      setData((data) => ({ ...data, [key]: value }));
    };

    ptashka.send();

    return () => {
      ptashka.pause();
    };
  }, []);

  const handleStateChange = () => {
    if (ptashka.isStatusPaused) {
      ptashka.resume();
    } else {
      ptashka.pause();
    }
  };

  const handleDeletion = () => deleteResource(resource);

  return (
    <li className={className} ref={itemRef}>
      <div className={contentClassName}>
        <ItemCellUrl baseClassName={contentClassName} url={url} />

        <ItemCellSent
          baseClassName={contentClassName}
          requestsSent={requestsSent}
        />

        <ItemCellStatus baseClassName={contentClassName} status={status} />

        <ItemCellStartedAt
          baseClassName={contentClassName}
          startedAt={startedAt}
        />

        <ItemCell baseClassName={contentClassName} type="state">
          <Button
            className={`${contentClassName}-state`}
            title={stateTitle}
            onClick={handleStateChange}
          >
            <Icon
              className={`${contentClassName}-state__icon`}
              icon={stateIcon}
            />
          </Button>
        </ItemCell>

        <ItemCell baseClassName={contentClassName} type="delete">
          <Button
            className={`${contentClassName}-delete`}
            title="Видалити процес"
            // title="Delete the process"
            onClick={handleDeletion}
          >
            <Icon icon={bombIcon} />
          </Button>
        </ItemCell>

        {/* <div className={`${contentClassName}__paused-at`}>{pausedAt}</div> */}
      </div>
    </li>
  );
};

export default BodyItem;
