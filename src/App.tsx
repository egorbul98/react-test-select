import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addCategoryInBD, changeCategory, changeCategoryInBD, fetchCategories, removeCategoryInBD, setActiveIdCategory} from './redux/actions/categories';
import { AppStateType } from './redux/reducers/rootReducer';
import { addChildrenInBD, fetchChildrensByIdCategory, removeChildren, removeChildrenInBD } from './redux/actions/childrens';
import { addEvent, clearEvents } from './redux/actions/events';
import FormChangeData from './components/FormChangeData/FormChangeData';
import MultiSelect from './components/MultiSelect/MultiSelect';
import ActionList from './components/ActionList/ActionList';

import './App.css';
import { TCategory, TChildren } from './mainTypes';
const arr = [ { label: 'apple', id: 0 }, { label: 'banana', id: 1 }, { label: 'pear', id: 2 } ];

function App() {
  const dispatch = useDispatch();
  const { categories, childrens, isLoadingChild, idActiveCategory, isLoadingCategory, events} = useSelector(({ categories, childrens, events}:AppStateType) => {
    return {
      categories: categories.items,
      idActiveCategory: categories.activeId,
      isLoadingCategory: categories.isLoading,
      childrens: childrens.items,
      isLoadingChild: childrens.isLoading,
      events: events.items
    }
  })
  useEffect(() => {
   dispatch(fetchCategories())
  }, []);
  
  const categoryOptions = React.useMemo(()=>categories.map((item:TCategory) => ({ id: item.id, label: item.name })), [categories]);
  const childrenOptions = React.useMemo(() => childrens.map((item: TChildren) => ({ id: item.id, label: item.name })), [childrens, idActiveCategory]);

  const onClearEvents = useCallback(() => {
    dispatch(clearEvents());
  }, [dispatch, clearEvents])
  
// callbacks in formChangeData
  const onAddCategory = useCallback((name: string, flag: string | null) => {
    dispatch(addCategoryInBD(name, flag || null));
    dispatch(addEvent("add category", "add " + name));
  }, [dispatch, addCategoryInBD, addEvent])

  const onAddChildren = useCallback((name: string, flag: string | null) => {
    idActiveCategory !== null && dispatch(addChildrenInBD(idActiveCategory, name, flag));
    dispatch(addEvent("Add children", "add " + name));
  }, [dispatch, idActiveCategory, addChildrenInBD, addEvent])

  const onChangeInputValue = useCallback((name, value) => {
    dispatch(addEvent("change input", "name " + name + "; value = " + value));
  }, [dispatch, addEvent])

  const onChangeCategory = useCallback((name, flags) => {
    if (idActiveCategory) {
      dispatch(changeCategoryInBD({id:idActiveCategory, name, flags}));
      dispatch(addEvent("change category", "name " + name + "; flags = " + flags));
    } else {
      alert("Сначала выберите категорию в select")
    }
  }, [dispatch, addEvent, idActiveCategory])

  
// callback in selects
  
const onSelectCategory = useCallback((id: number) => {
  if (idActiveCategory !== id) {
    dispatch(fetchChildrensByIdCategory(id));
    dispatch(addEvent("select category", "id category = " + id));
  }
}, [dispatch, idActiveCategory, fetchChildrensByIdCategory, addEvent]);
  
const onRemoveChildren = useCallback((id: number) => {
  dispatch(removeChildrenInBD(id));
  dispatch(addEvent("Remove children", "remove by id = " + id));
}, [dispatch, removeChildrenInBD, addEvent])
  
const onRemoveCategory = useCallback((id: number) => {
  if (idActiveCategory === id) {
    dispatch(setActiveIdCategory(null));
    dispatch(addEvent("Set active id category", "null"));
  }
  dispatch(removeCategoryInBD(id));
  dispatch(addEvent("Remove category", "remove by id = " + id));
}, [dispatch, idActiveCategory, removeCategoryInBD, setActiveIdCategory, addEvent])
  
const onClickOnSelect = useCallback((open:boolean) => {
  dispatch(addEvent("Click on select", "open = " + open));
}, [dispatch, addEvent])

const onDelFieldItems = useCallback((id:number) => {
  dispatch(addEvent("delete field from select-field", "id = " + id));
}, [dispatch, addEvent])

const onSelectChildren = useCallback((id:number) => {
  dispatch(addEvent("select children ", "id = " + id));
}, [dispatch, addEvent])
  
const onChangePage = useCallback((num:number) => {
  dispatch(addEvent("change page", "current page  = " + num));
}, [dispatch, addEvent])

  return (
    <div className="app">
      <div className="container">
        <div className="main">
          <div className="sidebar">
            <h3 className="title">Категории</h3>
            <MultiSelect options={categoryOptions} onSelectOptionsItem={onSelectCategory} onDelOptions={onRemoveCategory} isLoadingData={isLoadingCategory}
            onClick={onClickOnSelect}
            onDelFieldItems={onDelFieldItems}
              onChangePage={onChangePage} />
            
            <h3 className="title">Дочерние объекты категории</h3>
            <MultiSelect options={childrenOptions} multi isLoadingData={isLoadingChild} onDelOptions={onRemoveChildren}
              onClick={onClickOnSelect}
              onDelFieldItems={onDelFieldItems}
              onSelectOptionsItem={onSelectChildren}
              onChangePage={ onChangePage }/>
          </div>
    
          <div className="content">
            <FormChangeData 
              onAddCategory={onAddCategory} 
              onAddChildren={onAddChildren} 
              onChangeInputValue={onChangeInputValue} 
              onChangeCategory={ onChangeCategory}
            />
            <ActionList items={events} onClear={onClearEvents}/>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
