import React, { useEffect, useState, useMemo } from 'react';

import { Ptashka } from '../../../../lib/entities';
import { Button, Icon } from '../../../../components';

import playIcon from '/assets/icons/play.svg';
import pauseIcon from '/assets/icons/pause.svg';

import './styles.scss';

const ResourceItem = (props) => {
  const { resource } = props;

  const ptashka = useMemo(() => new Ptashka(resource), [resource]);

  const [data, setData] = useState(ptashka.toJSON());

  const { url, sent, status, startedAt, pausedAt } = data;

  useEffect(() => {
    // TODO: add throttle on change
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
    <li className="home-body-resource-list-item">
      <div className="home-body-resource-list-item__url">{url}</div>

      <div className="home-body-resource-list-item__sent">{sent}</div>

      <div className="home-body-resource-list-item__status">{status}</div>

      <div className="home-body-resource-list-item__started-at">
        {startedAt}
      </div>

      <Button
        className="home-body-resource-list-item-state"
        type="button"
        onClick={toggleState}
      >
        <Icon
          className="home-body-resource-list-item-state__icon"
          icon={ptashka.isStatusPaused ? playIcon : pauseIcon}
        />
      </Button>

      {/* <div className="home-body-resource-list-item__paused-at">{pausedAt}</div> */}
    </li>
  );
};

export default ResourceItem;
