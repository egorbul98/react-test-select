import React from 'react';
import Option from './Option';

import './multiSelect.css';

const MultiSelect = () => {
  return (
    <div className="multi-select">
      <div className="field">
        <div className="field-item">
          <div className="title">wqdqwdqwd</div>
          <div className="del">x</div>
        </div>
       
      </div>
      <div className="list-options">
        <Option id={1} title="asdasd"/>
        <Option id={1} title="asdasd"/>
        <Option id={1} title="asdasd"/>
        <Option id={1} title="asdasd"/>
        

      </div>
    </div>
  );
}

export default MultiSelect;
