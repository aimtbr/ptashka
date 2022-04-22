import React, { useState, useMemo } from 'react';

import { unifyClassNames, modifyClassNames } from '/src/lib/helpers.js';

import './styles.scss';

const GloDot = (props) => {
  const { className = '', children } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const defaultClassName = 'glo-dot';
  const classNameModifier = isCollapsed ? 'collapsed' : 'expanded';

  const classNames = modifyClassNames([defaultClassName, className].join(' '), classNameModifier);

  const contentClassName = unifyClassNames(classNames, 'content');
  const dotClassName = unifyClassNames(classNames, 'dot');

  const isChildrenExists = children?.length > 0;

  const toggleVisibility = (event) => {
    event.stopPropagation();

    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div
      className={classNames}
      onClick={toggleVisibility}
    >
      <div className={dotClassName}></div>
      {isChildrenExists ? <div className={contentClassName}>{children}</div> : null}
    </div>
  );
};

export default GloDot;
