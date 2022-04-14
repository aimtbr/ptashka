import React from 'react';

import './styles.scss';

const GloDot = (props) => {
  const { className = '', children } = props;

  const defaultClassName = 'glo-dot';

  const classNames = [defaultClassName, className].join(' ');

  return <div className={classNames}>{children}</div>;
};

export default GloDot;
