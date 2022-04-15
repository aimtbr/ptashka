import React, { useMemo } from 'react';

import { Anchor, Icon, GloDot } from '/src/components';
import { unifyClassNames } from '/src/lib/helpers.js';
import { urlToReadable } from '/src/lib/converters.js';

import collapseArrowDownIcon from '/assets/icons/collapse-arrow-down.svg';

const ItemContent = (props) => {
  const { baseClassName, url, isCollapsed, toggleDetails } = props;

  const defaultClassName = unifyClassNames(baseClassName, 'content');

  const classNames = useMemo(() => {
    const contentFlag = isCollapsed ? 'collapsed' : 'expanded';

    const classNameModified = `${defaultClassName}_${contentFlag}`;

    const classNames = [defaultClassName, classNameModified].join(' ');

    return classNames;
  }, [isCollapsed]);

  const urlReadable = useMemo(() => urlToReadable(url), [url]);

  return (
    <div
      className={classNames}
      onClick={toggleDetails}
    >
      <GloDot />

      <div className={unifyClassNames(classNames, 'url')}>
        <Anchor
          baseClassName={unifyClassNames(classNames, 'url')}
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
