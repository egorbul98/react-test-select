import { TChildren} from "../../mainTypes";
import {SET_CHILDRENS, SET_LOADING_CHILD, TSetChildrens, TSetLoading, ADD_CHILDREN, TAddChildren, REMOVE_CHILDREN, TRemoveChildren, REMOVE_CHILDRENS_BY_PARENT_ID, TRemoveChildrensByParentId } from "../actions/childrens";

const initialState = {
  items: [] as TChildren[],
  isLoading: false as boolean
}
export type StateChildrensType = typeof initialState;
 
type ActionsTypes = TSetChildrens | TSetLoading | TAddChildren | TRemoveChildren | TRemoveChildrensByParentId;

export const childrensReducer = (state = initialState, action:ActionsTypes):StateChildrensType => {
  switch (action.type) {
    case SET_CHILDRENS:
      return { ...state, items: action.payload };
    case SET_LOADING_CHILD:
      return { ...state, isLoading: action.payload };
    case ADD_CHILDREN:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_CHILDREN:
      return { ...state, items: state.items.filter((item)=>item.id !== action.payload) };
    case REMOVE_CHILDRENS_BY_PARENT_ID:
      console.log("ddwqd", action.payload);
      
      return { ...state, items: state.items.filter((item)=>item.parent_id !== action.payload) };
    
    default:
      return state;
  }
}
