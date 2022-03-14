import React from 'react';
import { v4 as generateUUID } from 'uuid';

import { ResourceItem } from './ResourceItem';

import './styles.scss';

const PtashkaList = (props) => {
  const { list } = props;

  const ResourceItems = () => {
    return list.map((resource) => {
      const uniqueId = generateUUID();

      return <ResourceItem key={uniqueId} resource={resource} />;
    });
  };

  return (
    <ul className="home-body-resource-list">
      <ResourceItems />
    </ul>
  );
};

export default PtashkaList;
