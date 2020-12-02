import { TChildren} from "../../mainTypes";
import {SET_CHILDRENS, SET_LOADING, TSetChildrens, TSetLoading } from "../actions/childrens";

const initialState = {
  items: [] as TChildren[],
  isLoading: false as boolean
}
export type StateChildrensType = typeof initialState;
 
type ActionsTypes = TSetChildrens | TSetLoading;

export const childrensReducer = (state = initialState, action:ActionsTypes):StateChildrensType => {
  switch (action.type) {
    case SET_CHILDRENS:
      return { ...state, items: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
}
