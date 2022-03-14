import React from 'react';

import './styles.scss';

const Button = (props) => {
  const { className, children, ...rest } = props;

  const classNameDefault = 'button';
  const classNames = [classNameDefault, className].join(' ');

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export default Button;
