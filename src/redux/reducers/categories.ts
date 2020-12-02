import { TCategory} from "../../mainTypes";
import { SET_CATEGORIES, TSetCategories} from "../actions/categories";

const initialState = {
  items: [] as TCategory[]
}
export type StatecategoriesType = typeof initialState;
 
type ActionsTypes = TSetCategories;

export const categoriesReducer = (state = initialState, action:ActionsTypes):StatecategoriesType => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, items: action.payload };
    
    default:
      return state;
  }
}
