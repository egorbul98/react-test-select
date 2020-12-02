import React, { useState } from 'react';
type PropTypes = {
  onAddCategory: (name:string)=>void,
  onAddChildren: (name:string)=>void
}
const FormAdd: React.FC<PropTypes> = ({ onAddCategory, onAddChildren }) => {
  const [nameCategory, setNameCategory] = useState('');
  const [nameChildren, setNameChildren] = useState('');
  const onChangeInput = (e:any) => {
    if (e.target.name === "category") {
      setNameCategory(e.target.value)
    } else {
      setNameChildren(e.target.value)
    }
  }
  const onAddChildrenHandler = () => {
    onAddChildren(nameChildren);
  }
  return (
    <div className="form-crud">
      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Добавление категории</h2>
        <label >
            <div className="label-text">Введите название категории</div>
          <input type="text" name="category" value={nameCategory} onChange={onChangeInput}/>
            <button type="button" >Добавить</button>
        </label>
      </div>

      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Добавление дочернего объекта</h2>
        <label >
            <div className="label-text">Введите название объекта. (Категория будет выбрана из select'a категорий)</div>
            <input type="text" name="children" value={nameChildren} onChange={onChangeInput}/>
            <button type="button" onClick={onAddChildrenHandler}>Добавить</button>
        </label>
      </div>
    </div>
  );
}

export default React.memo(FormAdd);
