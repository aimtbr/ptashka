import React, { useMemo } from 'react';

import { BodyItem } from './BodyItem';

import './styles.scss';

const ListBody = (props) => {
  const { baseClassName, list, deleteResource } = props;

  const className = `${baseClassName}-body`;

  const listItems = useMemo(
    () =>
      list.map((resource) => {
        const key = resource;

        return (
          <BodyItem
            key={key}
            baseClassName={className}
            resource={resource}
            deleteResource={deleteResource}
          />
        );
      }),
    [list, deleteResource]
  );

  return <ul className={className}>{listItems}</ul>;
};

export default ListBody;
