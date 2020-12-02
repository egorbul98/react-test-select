import { combineReducers } from 'redux';
import {categoriesReducer} from './categories';

const rootReducer = combineReducers({
  categories: categoriesReducer
})
type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;
export default rootReducer;
// This would produce the following state object
