import React, { useState } from 'react';
import { TCategory } from '../../mainTypes';
type PropTypes = {
  activeCategoryItem?: TCategory
  onAddCategory: (name:string, flag: string | null)=>void,
  onAddChildren: (name: string, flag: string | null) => void,
  onChangeCategory: (name: string, flag: string | null) => void,
  onChangeInputValue?:(name: string, value: string)=>void
}
// const initialState = {categoryName: ""}
const FormChangeData: React.FC<PropTypes> = ({ onAddCategory, onAddChildren, onChangeCategory, onChangeInputValue, activeCategoryItem }) => {
  
  const [stateInputs, setStateInputs] = useState<{ [key: string]: any }>({});
  
  React.useEffect(() => {
    if (activeCategoryItem) {
      let newState: { [key: string]: string } = { ...stateInputs, ["categoryChangeName"]: activeCategoryItem.name, "categoryChangeFlag": activeCategoryItem.flags || "" };
      setStateInputs(newState)
    }
  }, [activeCategoryItem]);
  const onChangeInput = (e: any) => {
    let newState:{[key:string]:string} = { ...stateInputs, [e.target.name]: e.target.value };
    setStateInputs(newState);
    onChangeInputValue && onChangeInputValue(e.target.name, newState[e.target.name])
  }
  const onAddChildrenHandler = () => {
    if (stateInputs["children"]) {
      onAddChildren(stateInputs["children"], stateInputs["childrenFlag"] || null);
    }else {
      alert("Заполните название children");
    }
  }
  const onAddCategoryHandler = () => {
    if (stateInputs["category"]) {
      onAddCategory(stateInputs["category"], stateInputs["categoryFlag"] || null);
    } else {
      alert("Заполните название категории");
    }
  }
  const onChangeCategoryHandler = () => {
    if (stateInputs["categoryChangeName"]) {
      onChangeCategory(stateInputs["categoryChangeName"], stateInputs["categoryChangeFlag"] || null);
    } else {
      alert("Заполните название категории");
    }
  }
  return (
    <div className="form-crud">
      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Добавление категории</h2>
        <button type="button" onClick={onAddCategoryHandler}>Добавить</button>
        <label >
          <div className="label-text">Введите название категории</div>
          <input type="text" name="category" value={stateInputs["category"]} onChange={onChangeInput}/>
        </label>
        <label >
          <div className="label-text">Введите флаг</div>
          <input type="text" name="categoryFlag" value={stateInputs["categoryFlag"]} onChange={onChangeInput}/>
        </label>
        
      </div>

      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Изменение категории</h2>
        <button type="button" onClick={onChangeCategoryHandler}>Сохранить</button>
        <label >
          <div className="label-text">Введите название категории</div>
          <input type="text" name="categoryChangeName" value={stateInputs["categoryChangeName"]} onChange={onChangeInput}/>
        </label>
        <label >
          <div className="label-text">Введите флаг</div>
          <input type="text" name="categoryChangeFlag" value={stateInputs["categoryChangeFlag"]} onChange={onChangeInput}/>
        </label>
        
      </div>

      <div className="form-crud-field">
        <h2 className="form-crud-field__title">Добавление дочернего объекта</h2>
        <button type="button" onClick={onAddChildrenHandler}>Добавить</button>
        <label >
            <div className="label-text">Введите название объекта. (Категория будет выбрана из select'a категорий)</div>
            <input type="text" name="children" value={stateInputs["children"]} onChange={onChangeInput}/>
        </label>
        <label >
            <div className="label-text">Введите флаг</div>
            <input type="text" name="childrenFlag" value={stateInputs["childrenFlag"]} onChange={onChangeInput}/>
        </label>
      </div>
    </div>
  );
}

export default React.memo(FormChangeData);
