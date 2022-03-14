import React from 'react';

import './styles.scss';

const Icon = (props) => {
  const { src, icon, className } = props;

  const classNameDefault = 'icon';
  const classNames = [classNameDefault, className].join(' ');

  const isSrcProvided = src !== undefined;

  const renderImageIcon = () => <img className={classNames} src={src} />;

  const renderCustomIcon = (CustomIcon) => (
    <CustomIcon className={classNames} />
  );

  return isSrcProvided ? renderImageIcon() : renderCustomIcon(icon);
};

export default Icon;
