import React, { useEffect, useState, useMemo } from 'react';

import { Ptashka } from '../../../../lib/entities';
import { Button, Icon, Anchor } from '../../../../components';
import ResourceItemSent from './ResourceItemSent';
import ResourceItemStatus from './ResourceItemStatus';
import ResourceItemStartedAt from './ResourceItemStartedAt';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';
import bombIcon from '/assets/icons/bomb.svg';

const ResourceItem = (props) => {
  const { className, resource, deleteResource } = props;

  const itemClassName = `${className}-item`;

  // TODO: the 'resource' is being changed each time the input value changes

  const ptashka = useMemo(() => new Ptashka(resource), []);

  const [data, setData] = useState(ptashka.toJSON());

  const { url, sent, status, startedAt, pausedAt } = data;

  const stateTitle = ptashka.isStatusPaused
    ? // ? "Resume the process"
      'Відновити процес'
    : // : "Pause the process"
      'Призупинити процес';
  const stateIcon = ptashka.isStatusPaused ? playIcon : pauseIcon;

  useEffect(() => {
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
    <li className={`${itemClassName}`}>
      <Anchor className={`${itemClassName}__url`} target="_blank" href={url}>
        {url}
      </Anchor>

      <ResourceItemSent className={itemClassName} sent={sent} />

      <ResourceItemStatus className={itemClassName} status={status} />

      <ResourceItemStartedAt className={itemClassName} startedAt={startedAt} />

      <Button
        className={`${itemClassName}-state`}
        title={stateTitle}
        onClick={handleStateChange}
      >
        <Icon className={`${itemClassName}-state__icon`} icon={stateIcon} />
      </Button>

      <Button
        className={`${itemClassName}-delete`}
        title="Видалити процес"
        // title="Delete the process"
        onClick={handleDeletion}
      >
        <Icon icon={bombIcon} />
      </Button>

      {/* <div className={`${itemClassName}__paused-at`}>{pausedAt}</div> */}
    </li>
  );
};

export default ResourceItem;
