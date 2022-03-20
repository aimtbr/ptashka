import React, { useEffect, useState, useMemo } from 'react';

import { Ptashka } from '../../../../lib/entities';
import { Button, Icon } from '../../../../components';
import ResourceItemSent from './ResourceItemSent';
import ResourceItemStatus from './ResourceItemStatus';
import ResourceItemStartedAt from './ResourceItemStartedAt';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';

const ResourceItem = (props) => {
  const { className, resource } = props;

  const itemClassName = `${className}-item`;

  const ptashka = useMemo(() => {
    return new Ptashka(resource);
  }, [resource]);

  const [data, setData] = useState(ptashka.toJSON());

  const { url, sent, status, startedAt, pausedAt } = data;

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

  const toggleState = () => {
    if (ptashka.isStatusPaused) {
      ptashka.resume();
    } else {
      ptashka.pause();
    }
  };

  return (
    <li className={`${itemClassName}`}>
      <a className={`${itemClassName}__url`} target="_blank" href={url}>
        {url}
      </a>

      <ResourceItemSent className={itemClassName} sent={sent} />

      <ResourceItemStatus className={itemClassName} status={status} />

      <ResourceItemStartedAt className={itemClassName} startedAt={startedAt} />

      <Button
        className={`${itemClassName}-state`}
        type="button"
        onClick={toggleState}
      >
        <Icon
          className={`${itemClassName}-state__icon`}
          icon={ptashka.isStatusPaused ? playIcon : pauseIcon}
        />
      </Button>

      {/* <div className={`${itemClassName}__paused-at`}>{pausedAt}</div> */}
    </li>
  );
};

export default ResourceItem;
