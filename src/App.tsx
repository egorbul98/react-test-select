import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addCategoryInBD, fetchCategories, removeCategoryInBD, setActiveIdCategory} from './redux/actions/categories';
import './App.css';
import MultiSelect from './components/MultiSelect';
import { AppStateType } from './redux/reducers/rootReducer';
import { TCategory, TChildren } from './mainTypes';
import { addChildrenInBD, fetchChildrensByIdCategory, removeChildren, removeChildrenInBD } from './redux/actions/childrens';
import FormAdd from './components/FormAdd/FormAdd';
import { useCallback } from 'react';
const arr = [ { label: 'apple', id: 0 }, { label: 'banana', id: 1 }, { label: 'pear', id: 2 } ];

function App() {
  const dispatch = useDispatch();
  const { categories, childrens, isLoadingChild, idActiveCategory, isLoadingCategory} = useSelector(({ categories, childrens }:AppStateType) => {
    return {
      categories: categories.items,
      idActiveCategory: categories.activeId,
      isLoadingCategory: categories.isLoading,
      childrens: childrens.items,
      isLoadingChild: childrens.isLoading,
    }
  })
  useEffect(() => {
   dispatch(fetchCategories())
  }, []);
  
  const categoryOptions = React.useMemo(()=>categories.map((item:TCategory) => ({ id: item.id, label: item.name })), [categories]);
  const childrenOptions = React.useMemo(()=>childrens.map((item:TChildren) => ({ id: item.id, label: item.name })), [childrens, idActiveCategory]);


  const onSelectCategory = useCallback((id: number) => {
    idActiveCategory !== id && dispatch(fetchChildrensByIdCategory(id));
  }, [dispatch, idActiveCategory, fetchChildrensByIdCategory]);

  const onAddCategory = useCallback((name: string, flag: string | null) => {
    dispatch(addCategoryInBD(name, flag))
  }, [dispatch, addCategoryInBD])

  const onRemoveCategory = useCallback((id: number) => {
    if (idActiveCategory === id) {
      dispatch(setActiveIdCategory(null));
    }
    dispatch(removeCategoryInBD(id));
  }, [dispatch, idActiveCategory, removeCategoryInBD, setActiveIdCategory])

  const onAddChildren = useCallback((name: string, flag: string | null) => {
    idActiveCategory!==null && dispatch(addChildrenInBD(idActiveCategory, name, flag));
  }, [dispatch, idActiveCategory, addChildrenInBD])

  const onRemoveChildren = useCallback((id: number) => {
    dispatch(removeChildrenInBD(id));
  }, [dispatch, removeChildrenInBD])

  return (
    <div className="app">
      <div className="container">
        <div className="main">
          <div className="sidebar">
            <h3 className="title">Категории</h3>
            <MultiSelect options={categoryOptions} onSelectOptionsItem={onSelectCategory} onDelOptions={onRemoveCategory} isLoadingData={isLoadingCategory}/>
            <h3 className="title">Дочерние объекты категории</h3>
            <MultiSelect options={childrenOptions} multi isLoadingData={isLoadingChild} onDelOptions={onRemoveChildren}/>
          </div>
    
          <div className="content">
            <FormAdd onAddCategory={onAddCategory} onAddChildren={onAddChildren}/>
            <div className="action-list">
              dqwdwqdq
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
