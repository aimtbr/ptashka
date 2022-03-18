import React, { useEffect, useState, useMemo } from 'react';

import { Ptashka } from '../../../../lib/entities';
import { Button, Icon } from '../../../../components';
import { ResourceItemStatus } from './ResourceItemStatus';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';

const ResourceItem = (props) => {
  const { className, resource } = props;

  const itemClassName = `${className}-item`;

  const ptashka = useMemo(() => new Ptashka(resource), [resource]);

  const [data, setData] = useState(ptashka.toJSON());

  const { url, sent, status, startedAt, pausedAt } = data;

  useEffect(() => {
    console.log('RENDER');

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
      <div className={`${itemClassName}__url`}>{url}</div>

      <div className={`${itemClassName}__sent`}>{sent}</div>

      <ResourceItemStatus className={itemClassName} status={status} />

      <div className={`${itemClassName}__started-at`}>{startedAt}</div>

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
