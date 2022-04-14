import React, { useEffect, useState, useMemo, useRef } from 'react';

import { Anchor, Icon, GloDot } from '/src/components';
import { urlToReadable } from '/src/lib/converters.js';
import { unifyClassNames } from '/src/lib/helpers.js';
import { Ptashka } from '/src/lib/entities';

import { ItemHiddenContent } from './ItemHiddenContent';

import collapseArrowDownIcon from '/assets/icons/collapse-arrow-down.svg';

import './styles.scss';

const BodyItem = (props) => {
  const { baseClassName, resource, deleteResource } = props;

  const itemRef = useRef(null);

  const ptashka = useMemo(() => new Ptashka(resource), []);

  const [data, setData] = useState(ptashka.toJSON());

  const [isCollapsed, setIsCollapsed] = useState(true);

  const className = `${baseClassName}-item`;

  const contentClassName = useMemo(() => {
    const contentFlag = isCollapsed ? 'collapsed' : 'expanded';

    const defaultClassName = `${className}-content`;
    const classNameModified = `${defaultClassName}_${contentFlag}`;

    const classNames = [defaultClassName, classNameModified].join(' ');

    return classNames;
  }, [isCollapsed]);

  const { url, requestsSent, successRate, status, startedAt } = data;

  const urlReadable = useMemo(() => urlToReadable(url), [url]);

  // TODO: display a success rate

  useEffect(() => {
    itemRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    ptashka.onchange = (change) => {
      const { key, value } = change;

      setData((data) => ({ ...data, [key]: value }));
    };

    // TEMP DISABLED
    // ptashka.send();

    // return () => {
    //   ptashka.pause();
    // };
  }, []);

  const toggleHiddenContent = () => setIsCollapsed((isCollapsed) => !isCollapsed);

  const toggleItemState = () => {
    if (ptashka.isStatusPaused) {
      ptashka.resume();
    } else {
      ptashka.pause();
    }
  };

  const deleteItem = () => deleteResource(resource);

  return (
    <li
      className={className}
      ref={itemRef}
    >
      <div
        className={contentClassName}
        onClick={toggleHiddenContent}
      >
        <GloDot />

        <Anchor
          className={unifyClassNames(contentClassName, 'url')}
          href={url}
          target="_blank"
        >
          {urlReadable}
        </Anchor>

        <Icon
          baseClassName={contentClassName}
          icon={collapseArrowDownIcon}
        />
      </div>

      <ItemHiddenContent
        baseClassName={contentClassName}
        requestsSent={requestsSent}
        status={status}
        startedAt={startedAt}
        toggleItemState={toggleItemState}
        deleteItem={deleteItem}
        isHidden={isCollapsed}
      />
    </li>
  );
};

export default BodyItem;
