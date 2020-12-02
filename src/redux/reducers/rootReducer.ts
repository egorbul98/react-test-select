import { combineReducers } from 'redux';
import {categoriesReducer} from './categories';
import {childrensReducer} from './childrens';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  childrens: childrensReducer
})
type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;
export default rootReducer;
// This would produce the following state object
