import React from 'react';

import { ListBody } from './ListBody';

import './styles.scss';

const ResourceList = (props) => {
  const { list, deleteResource } = props;

  const listClassName = 'home-body-resource-list';

  return (
    <div className={listClassName}>
      <ListBody
        baseClassName={listClassName}
        list={list}
        deleteResource={deleteResource}
      />
    </div>
  );
};

export default ResourceList;
