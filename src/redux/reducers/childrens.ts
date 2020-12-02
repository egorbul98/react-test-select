import { TChildren} from "../../mainTypes";
import {SET_CHILDRENS, SET_LOADING, TSetChildrens, TSetLoading, ADD_CHILDREN, TAddChildren, REMOVE_CHILDREN, TRemoveChildren } from "../actions/childrens";

const initialState = {
  items: [] as TChildren[],
  isLoading: false as boolean
}
export type StateChildrensType = typeof initialState;
 
type ActionsTypes = TSetChildrens | TSetLoading | TAddChildren | TRemoveChildren;

export const childrensReducer = (state = initialState, action:ActionsTypes):StateChildrensType => {
  switch (action.type) {
    case SET_CHILDRENS:
      return { ...state, items: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_CHILDREN:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_CHILDREN:
      return { ...state, items: state.items.filter((item)=>item.id !== action.payload) };
    
    default:
      return state;
  }
}
