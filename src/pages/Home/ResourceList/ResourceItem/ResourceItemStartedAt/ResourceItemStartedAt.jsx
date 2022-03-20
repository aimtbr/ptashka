import React from 'react';

import { dateToReadable } from '/src/lib/converters.js';

const ResourceItemStartedAt = (props) => {
  const { className, startedAt, locale } = props;

  const defaultClassName = `${className}__started-at`;

  const startedAtReadable = dateToReadable(startedAt, locale.tag);

  return <div className={defaultClassName}>{startedAtReadable}</div>;
};

export default ResourceItemStartedAt;
