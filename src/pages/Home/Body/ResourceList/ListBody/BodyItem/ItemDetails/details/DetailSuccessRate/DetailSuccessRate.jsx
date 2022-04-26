import React from 'react';

import { Detail } from '../../Detail';
import { unifyClassNames } from '/src/lib/helpers.js';

const DetailSuccessRate = (props) => {
  const { baseClassName, successRate } = props;

  const className = unifyClassNames(baseClassName, 'detail-success-rate');
  const contentClassName = `${className}-content`;
  const spanClassName = `${className}-span`;

  return (
    <Detail
      className={className}
      baseClassName={baseClassName}
    >
      <div className={contentClassName}>Відсоток успішних запитів:</div>

      <span className={spanClassName}>{successRate}%</span>
    </Detail>
  );
};

export default DetailSuccessRate;
