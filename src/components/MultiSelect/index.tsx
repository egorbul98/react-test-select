import React, { useState } from 'react';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';
import Option from './Option';
import FieldItem from './FieldItem';

import './multiSelect.css';
import { TCategory } from '../../mainTypes';
const arr = ["абрис", "apricot", "banana", "carror"];
type PropTypes = {
    // items: TCategory[];
    multi?: boolean
}
const MultiSelect: React.FC<PropTypes> = ({ multi }) => {
  const [valueFieldInput, setValueFieldInput] = useState('');

  const onChangeFieldHandler = (e: any) => {
    setValueFieldInput(e.target.value)
  }
  const onSelectFieldHandler = (value: string) => {
    setValueFieldInput(value)
  }

  const onClickFieldItem = (part: any) => {
      console.log("part");
      
        console.log(part);
    }

    return (
        <div className={classNames("select-total", {"multi-select": multi})}>
        <div className="field-wrap">
        <Autocomplete
            getItemValue={(item) => item.label}
            items={[
              { label: 'apple', id: 0 },
              { label: 'banana', id:1 },
              { label: 'pear', id:2  }
            ]}
            renderItem={(item, isHighlighted) =>
              <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }} onClick={()=>console.log("sssssssss")}>
                {item.label + " "+item.id} 
              </div>
                }
  
            value={valueFieldInput}
            onChange={onChangeFieldHandler}
            onSelect={onSelectFieldHandler}
          />
          
                {/* {multi && <TextInput
                    // onRequestOptions={handleRequestOptions}
                    options={arr}
                    trigger={""}
            className="field"
            onChange={(e:any)=>console.log(e)}
                    regex={"^[a-zA-Zа-яА-Я0-9_\-]+$"}/>} */}

                {/* <FieldItem id={1} title="asdasd"/>
                <FieldItem id={1} title="asdasd"/> */}

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
