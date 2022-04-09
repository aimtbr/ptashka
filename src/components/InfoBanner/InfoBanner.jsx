import React, { useEffect } from 'react';

import { Button, Icon } from '/src/components/';

import crossIcon from '/assets/icons/cross.svg';

import './styles.scss';

const InfoBanner = (props) => {
  const { className, message, isVisible, refreshInfoBanner, hideInfoBanner } =
    props;

  const defaultClassName = 'info-banner';
  const classNames = [defaultClassName, className].join(' ');

  const composeClassName = (className) => `${defaultClassName}${className}`;

  useEffect(() => {
    refreshInfoBanner();
  }, []);

  return isVisible ? (
    <div className={classNames}>
      <div className={composeClassName('-message')}>
        <div className={composeClassName('-message-info')}>i</div>
        <div className={composeClassName('-message-text')}>{message}</div>
      </div>

      <Button
        className={composeClassName('-hide')}
        aria-label="Сховати інформаційне повідомлення"
        onClick={hideInfoBanner}
      >
        <Icon icon={crossIcon} />
      </Button>
    </div>
  ) : null;
};

export default InfoBanner;
