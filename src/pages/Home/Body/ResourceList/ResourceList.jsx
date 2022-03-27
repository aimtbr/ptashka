import React from 'react';

import { ListHeader } from './ListHeader';
import { ListBody } from './ListBody';

import './styles.scss';

const ResourceList = (props) => {
  const { list, deleteResource } = props;

  const listClassName = 'home-body-resource-list';

  const isListEmpty = list.length === 0;

  return isListEmpty ? null : (
    <div className={listClassName}>
      <ListHeader baseClassName={listClassName} />

      <ListBody
        baseClassName={listClassName}
        list={list}
        deleteResource={deleteResource}
      />
    </div>
  );
};

export default ResourceList;
