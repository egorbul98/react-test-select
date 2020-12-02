import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchCategories, setActiveIdCategory} from './redux/actions/categories';
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
  const { categories, childrens, isLoadingChild, idActiveCategory} = useSelector(({ categories, childrens }:AppStateType) => {
    return {
      categories: categories.items,
      idActiveCategory: categories.activeId,
      childrens: childrens.items,
      isLoadingChild: childrens.isLoading,
    }
  })
  useEffect(() => {
   dispatch(fetchCategories())
  }, []);
  
  const categoryOptions = React.useMemo(()=>categories.map((item:TCategory) => ({ id: item.id, label: item.name })), [categories]);
  const childrenOptions = React.useMemo(()=>childrens.map((item:TChildren) => ({ id: item.id, label: item.name })), [childrens]);


  const onSelectCategory = useCallback((id: number) => {
    idActiveCategory !== id && dispatch(fetchChildrensByIdCategory(id));
  }, [dispatch, idActiveCategory]);

  const onAddCategory =  useCallback((name: string) => {
    
  }, [dispatch])
  const onRemoveCategory = useCallback((id: number) => {
    // dispatch(removeChildrenInBD(id));
  }, [dispatch])
  const onAddChildren = useCallback((name: string) => {
    idActiveCategory!==null && dispatch(addChildrenInBD(idActiveCategory, name, "ss"));
  }, [dispatch, idActiveCategory])
  const onRemoveChildren = useCallback((id: number) => {
    dispatch(removeChildrenInBD(id));
  }, [dispatch])

  return (
    <div className="app">
      <div className="container">
        <div className="main">
          <div className="sidebar">
            <h3 className="title">Категории</h3>
            <MultiSelect options={categoryOptions} onSelectOptionsItem={onSelectCategory} />
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
