import React from 'react';
import { v4 as generateUUID } from 'uuid';

import { ResourceItem } from './ResourceItem';

import './styles.scss';

const ResourceList = (props) => {
  const { list, deleteResource } = props;

  const listClassName = 'home-body-resource-list';

  const isListEmpty = list.length === 0;

  const listItems = list.map((resource) => {
    const uniqueId = resource;

    return (
      <ResourceItem
        key={uniqueId}
        className={listClassName}
        resource={resource}
        deleteResource={deleteResource}
      />
    );
  });

  return isListEmpty ? null : (
    <>
      <div className={`${listClassName}-header`}>
        <div>Веб-сайт</div>
        <div>Надіслано</div>
        <div>Статус</div>
        <div>Час старту</div>
      </div>

      <ul className={listClassName}>{listItems}</ul>
    </>
  );
};

export default ResourceList;
