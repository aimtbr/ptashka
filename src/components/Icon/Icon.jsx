import React from 'react';

import { unifyClassNames } from '/src/lib/helpers.js';

import './styles.scss';

const Icon = (props) => {
  const { baseClassName = '', className = '', src, icon, ...rest } = props;

  const defaultClassName = 'icon';

  const baseClassNameExtended = baseClassName
    ? unifyClassNames(baseClassName, defaultClassName)
    : '';

  const classNames = [defaultClassName, baseClassNameExtended, className].join(' ');

  const isSrcProvided = src !== undefined;

  const renderImageIcon = () => (
    <img
      className={classNames}
      src={src}
      {...rest}
    />
  );

  const renderCustomIcon = (CustomIcon) => (
    <CustomIcon
      className={classNames}
      {...rest}
    />
  );

  return isSrcProvided ? renderImageIcon() : renderCustomIcon(icon);
};

export default Icon;
