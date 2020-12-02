import React, { useState } from 'react';
type PropTypes = {
  onAddCategory: (name:string, flag: string | null)=>void,
  onAddChildren: (name:string, flag: string | null)=>void
}
// const initialState = {categoryName: ""}
const FormAdd: React.FC<PropTypes> = ({ onAddCategory, onAddChildren }) => {
  const [stateInputs, setStateInputs] = useState<{[key:string]:string}>({});
  const onChangeInput = (e: any) => {
    setStateInputs({ ...stateInputs, [e.target.name]: e.target.value })
  }
  const onAddChildrenHandler = () => {
    onAddChildren(stateInputs["children"], stateInputs["childrenFlag"] || null);
  }
  const onAddCategoryHandler = () => {
    onAddCategory(stateInputs["category"], stateInputs["categoryFlag"] || null);
  }
  return (
    <div className="form-crud">
      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Добавление категории</h2>
        <label >
          <div className="label-text">Введите название категории</div>
          <input type="text" name="category" value={stateInputs["category"]} onChange={onChangeInput}/>
        </label>
        <label >
          <div className="label-text">Введите флаг</div>
          <input type="text" name="categoryFlag" value={stateInputs["categoryFlag"]} onChange={onChangeInput}/>
        </label>
        <button type="button" onClick={onAddCategoryHandler}>Добавить</button>
      </div>

      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Добавление дочернего объекта</h2>
        <label >
            <div className="label-text">Введите название объекта. (Категория будет выбрана из select'a категорий)</div>
            <input type="text" name="children" value={stateInputs["children"]} onChange={onChangeInput}/>
        </label>
        <label >
            <div className="label-text">Введите флаг</div>
            <input type="text" name="childrenFlag" value={stateInputs["childrenFlag"]} onChange={onChangeInput}/>
        </label>
        <button type="button" onClick={onAddChildrenHandler}>Добавить</button>
      </div>
    </div>
  );
}

export default React.memo(FormAdd);
