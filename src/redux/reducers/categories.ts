import { TCategory} from "../../mainTypes";
import { SET_CATEGORIES, TSetCategories, SET_ACTIVE_ID_CATEGORY, TSetActiveIdCategory, SET_LOADING, TSetLoading, ADD_CATEGORY, REMOVE_CATEGORY, TAddCategory, TRemoveCategory} from "../actions/categories";

const initialState = {
  items: [] as TCategory[],
  activeId: null as number | null,
  isLoading: false as boolean
}
export type StateCategoriesType = typeof initialState;
 
type ActionsTypes = TSetCategories | TSetActiveIdCategory | TSetLoading | TAddCategory | TRemoveCategory;

export const categoriesReducer = (state = initialState, action:ActionsTypes):StateCategoriesType => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, items: action.payload };
    case SET_ACTIVE_ID_CATEGORY:
      return { ...state, activeId: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_CATEGORY:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_CATEGORY:
    return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    
    default:
      return state;
  }
}
