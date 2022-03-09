import React from 'react';

const Input = (props) => {
  const { className, ...rest } = props;

  const classNameDefault = 'input';
  const classNames = [classNameDefault, className].join(' ');

  return <input className={classNames} {...rest} />;
};

export default Input;
