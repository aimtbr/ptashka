import React from 'react';

import './styles.scss';

const Anchor = (props) => {
  const { className, children, ...rest } = props;

  const defaultClassName = 'anchor';
  const classNames = [defaultClassName, className].join(' ');

  return (
    <a
      className={classNames}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Anchor;
