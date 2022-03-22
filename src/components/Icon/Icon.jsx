import React from 'react';

import './styles.scss';

const Icon = (props) => {
  const { className, src, icon, ...rest } = props;

  const classNameDefault = 'icon';
  const classNames = [classNameDefault, className].join(' ');

  const isSrcProvided = src !== undefined;

  const renderImageIcon = () => (
    <img className={classNames} src={src} {...rest} />
  );

  const renderCustomIcon = (CustomIcon) => (
    <CustomIcon className={classNames} {...rest} />
  );

  return isSrcProvided ? renderImageIcon() : renderCustomIcon(icon);
};

export default Icon;
