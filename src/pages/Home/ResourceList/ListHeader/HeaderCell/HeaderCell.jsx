import React from 'react';

const HeaderCell = (props) => {
  const { baseClassName, type, children = null } = props;

  const className = `${baseClassName}-cell`;
  const classNameModified = `${className}_${type}`;

  const classNames = [className, classNameModified].join(' ');

  return <div className={classNames}>{children}</div>;
};

export default HeaderCell;
