import React from 'react';
import { TEvent } from '../../mainTypes';

import './styles.css';

type PropsType = {
  items: TEvent[],
  onClear?: ()=>void
}
const ActionList: React.FC<PropsType> = ({ items, onClear }) => {
  const onClickClearBtn = () => {
    onClear && items.length > 0 && onClear();
  }
  return (
    <div className="actions">
      <h2>Пользовательские действия</h2>
      <button type="button" onClick={onClickClearBtn}>Очистить</button>
      <div className="actions__list">
        <div className="actions__item" >
          <div className="id">ID</div>
          <div className="event-name">EVENT NAME</div>
          <div className="event-value">EVENT VALUE</div>
        </div>
        {items.map((item) => {
          return (
            <div className="actions__item" key={item.id}>
              <div className="id">{item.id}</div>
              <div className="event-name">{item.eventName}</div>
              <div className="event-value">{item.eventValue}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default React.memo(ActionList);
