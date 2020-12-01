import React from 'react';
import Option from './Option';

import './multiSelect.css';
import FieldItem from './FieldItem';

const MultiSelect = () => {
  return (
    <div className="multi-select">
      <div className="field">
        
       <FieldItem id={1} title="asdasd"/>
       <FieldItem id={1} title="asdasd"/>
       <FieldItem id={1} title="asdasd"/>
       <FieldItem id={1} title="asdasd"/>
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
