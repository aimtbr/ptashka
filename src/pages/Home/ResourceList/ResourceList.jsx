import React, { useEffect } from 'react';
import { v4 as generateUUID } from 'uuid';

import { ResourceItem } from './ResourceItem';

import './styles.scss';

const ResourceList = (props) => {
  const { list } = props;

  const listClassName = 'home-body-resource-list';

  const ResourceItems = () => {
    return list.map((resource) => {
      const uniqueId = generateUUID();

      return (
        <ResourceItem
          // key={uniqueId}
          className={listClassName}
          resource={resource}
        />
      );
    });
  };

  return (
    <ul className={listClassName}>
      <ResourceItems />
    </ul>
  );
};

export default ResourceList;
