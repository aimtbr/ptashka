import React from 'react';

import { Detail } from '../../Detail';
import { dateToReadable } from '/src/lib/converters.js';
import { unifyClassNames } from '/src/lib/helpers.js';

const DetailStartedAt = (props) => {
  const { baseClassName, startedAt, locale } = props;

  const className = unifyClassNames(baseClassName, 'detail-started-at');
  const contentClassName = `${className}__content`;

  const startedAtReadable = dateToReadable(startedAt, locale.code);

  return (
    <Detail
      className={className}
      baseClassName={baseClassName}
    >
      <div className={contentClassName}>{startedAtReadable}</div>
    </Detail>
  );
};

export default DetailStartedAt;
