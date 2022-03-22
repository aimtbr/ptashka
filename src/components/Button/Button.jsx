import React from 'react';

import './styles.scss';

const Button = (props) => {
  const { className, children, type = 'button', ...rest } = props;

  const classNameDefault = 'button';
  const classNames = [classNameDefault, className].join(' ');

  return (
    <button className={classNames} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
