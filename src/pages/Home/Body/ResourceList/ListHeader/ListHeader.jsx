import React from 'react';

import { HeaderCell } from './HeaderCell';

import './styles.scss';

const ListHeader = (props) => {
  const { baseClassName } = props;

  const listHeaderClassName = `${baseClassName}-header`;
  const listHeaderContentClassName = `${listHeaderClassName}-content`;

  return (
    <div className={listHeaderClassName}>
      <div className={listHeaderContentClassName}>
        <HeaderCell baseClassName={listHeaderContentClassName} type="url">
          Веб-сайт
        </HeaderCell>

        <HeaderCell baseClassName={listHeaderContentClassName} type="sent">
          Надіслано
        </HeaderCell>

        <HeaderCell baseClassName={listHeaderContentClassName} type="status">
          Статус
        </HeaderCell>

        <HeaderCell
          baseClassName={listHeaderContentClassName}
          type="started-at"
        >
          Час старту
        </HeaderCell>

        <HeaderCell baseClassName={listHeaderContentClassName} type="state" />

        <HeaderCell baseClassName={listHeaderContentClassName} type="delete" />
      </div>
    </div>
  );
};

export default ListHeader;
