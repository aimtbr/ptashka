import React from 'react';

import { Detail } from '../../Detail';
import { unifyClassNames } from '/src/lib/helpers.js';

const DetailRequestsSent = (props) => {
  const { baseClassName, requestsSent } = props;

  const className = unifyClassNames(baseClassName, 'detail-sent');
  const contentClassName = `${className}-content`;
  const spanClassName = `${className}-span`;

  // TODO: get it displayed in the format of 2 to the power of n

  return (
    <Detail
      className={className}
      baseClassName={baseClassName}
    >
      <div className={contentClassName}>Надіслано запитів:</div>

      <span className={spanClassName}>{requestsSent}</span>
    </Detail>
  );
};

export default DetailRequestsSent;
