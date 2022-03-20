import React from 'react';

const ResourceItemSent = (props) => {
  const { className, sent } = props;

  const defaultClassName = `${className}__sent`;

  return <div className={defaultClassName}>{sent}</div>;
};

export default ResourceItemSent;
