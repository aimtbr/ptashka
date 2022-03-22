import React from 'react';

import './styles.scss';

const Anchor = (props) => {
  const { className, children, ...rest } = props;

  const classNameDefault = 'anchor';
  const classNames = [classNameDefault, className].join(' ');

  return (
    <a className={classNames} {...rest}>
      {children}
    </a>
  );
};

export default Anchor;
