import React from 'react';

import './styles.scss';

const HeaderCell = (props) => {
  const { baseClassName, type, children = null } = props;

  const defaultClassName = 'header-cell';

  const className = `${baseClassName}-cell`;
  const classNameModified = `${className}_${type}`;

  const classNames = [defaultClassName, className, classNameModified].join(' ');

  return <div className={classNames}>{children}</div>;
};

export default HeaderCell;
