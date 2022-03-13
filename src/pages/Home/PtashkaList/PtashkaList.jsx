import React from 'react';
import { v4 as generateUUID } from 'uuid';

import { PtashkaItem } from './PtashkaItem';

import './styles.scss';

const PtashkaList = (props) => {
  const { list } = props;

  const PtashkaItems = () => {
    return list.map((item) => {
      const uniqueId = generateUUID();

      return <PtashkaItem key={uniqueId} item={item} />;
    });
  };

  return (
    <ul className="home-body-ptashka-list">
      <PtashkaItems />
    </ul>
  );
};

export default PtashkaList;
