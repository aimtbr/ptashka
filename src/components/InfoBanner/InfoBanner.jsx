import React, { useEffect } from 'react';

import { Button, Icon } from '/src/components/';
import { unifyClassNames } from '/src/lib/helpers.js';

import crossIcon from '/assets/icons/cross.svg';

import './styles.scss';

const InfoBanner = (props) => {
  const { className = '', message, isVisible, refreshInfoBanner, hideInfoBanner } = props;

  const defaultClassName = 'info-banner';
  const classNames = [defaultClassName, className].join(' ');

  useEffect(() => {
    refreshInfoBanner();
  }, []);

  return isVisible ? (
    <div className={classNames}>
      <div className={unifyClassNames(classNames, 'message')}>
        <div className={unifyClassNames(classNames, 'message-info')}>i</div>
        <div className={unifyClassNames(classNames, 'message-text')}>{message}</div>
      </div>

      <Button
        className={unifyClassNames(classNames, 'hide')}
        aria-label="Сховати інформаційне повідомлення"
        onClick={hideInfoBanner}
      >
        <Icon icon={crossIcon} />
      </Button>
    </div>
  ) : null;
};

export default InfoBanner;
