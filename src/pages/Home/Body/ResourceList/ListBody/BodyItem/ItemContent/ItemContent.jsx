import React, { useMemo } from 'react';

import { Anchor, Icon, GloDot } from '/src/components';
import { unifyClassNames, modifyClassNames } from '/src/lib/helpers.js';
import { urlToReadable } from '/src/lib/converters.js';
import {
  PTASHKA_STATUS_READY,
  PTASHKA_STATUS_RUNNING,
  PTASHKA_STATUS_PAUSED,
} from '/src/lib/constants.js';

import collapseArrowDownIcon from '/assets/icons/collapse-arrow-down.svg';

const ItemContent = (props) => {
  const { baseClassName, status, url, isCollapsed, toggleDetails } = props;

  const defaultClassName = unifyClassNames(baseClassName, 'content');

  const classNames = useMemo(() => {
    const contentFlag = isCollapsed ? 'collapsed' : 'expanded';

    const classNameModified = `${defaultClassName}_${contentFlag}`;

    const classNames = [defaultClassName, classNameModified].join(' ');

    return classNames;
  }, [isCollapsed]);

  const statusClassName = useMemo(() => {
    const statusClassNameBase = unifyClassNames(classNames, 'status');

    const modifiers = {
      [PTASHKA_STATUS_READY]: 'ready',
      [PTASHKA_STATUS_RUNNING]: 'running',
      [PTASHKA_STATUS_PAUSED]: 'paused',
    };

    const statusClassNameModifier = modifiers[status];

    const statusClassNames = modifyClassNames(statusClassNameBase, statusClassNameModifier);

    return statusClassNames;
  }, [status]);

  const urlClassName = unifyClassNames(classNames, 'url');

  const urlReadable = useMemo(() => urlToReadable(url), [url]);

  return (
    <div
      className={classNames}
      onClick={toggleDetails}
    >
      <GloDot className={statusClassName}>{status}</GloDot>

      <div className={urlClassName}>
        <Anchor
          baseClassName={urlClassName}
          href={url}
          target="_blank"
        >
          {urlReadable}
        </Anchor>
      </div>

      <Icon
        baseClassName={classNames}
        icon={collapseArrowDownIcon}
      />
    </div>
  );
};

export default ItemContent;
