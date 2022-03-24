import React from 'react';

const ItemCell = (props) => {
  const { baseClassName, type, children } = props;

  const className = `${baseClassName}-cell`;

  const classNameModified = `${className}_${type}`;

  const classNames = [className, classNameModified].join(' ');

  return <div className={classNames}>{children}</div>;
};

export default ItemCell;
