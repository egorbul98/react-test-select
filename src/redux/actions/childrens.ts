import Axios from "axios";
import { TChildren } from "../../mainTypes";
import { setActiveIdCategory } from "./categories";

const urlDataServ = "http://localhost:3004";

export const SET_CHILDRENS = "SET_CHILDRENS";
export const SET_LOADING = "SET_LOADING";
export const ADD_CHILDREN = "ADD_CHILDREN";

export type TAddChildren = {
  type: typeof ADD_CHILDREN,
  payload: TChildren
}

export const addChildren = (item: TChildren): TAddChildren => {
  return {
    type: ADD_CHILDREN, 
    payload: item
  }
}

export type TSetLoading = {
  type: typeof SET_LOADING,
  payload: boolean
}

export const setLoading = (isLoading: boolean): TSetLoading => {
  return {
    type: SET_LOADING, 
    payload: isLoading
  }
}

export type TSetChildrens = {
  type: typeof SET_CHILDRENS,
  payload: TChildren[]
}

export const setChildrens = (childrens: TChildren[]): TSetChildrens => {
  return {
    type: SET_CHILDRENS, 
    payload: childrens
  }
}

export const addChildrenInBD = (parent_id: number, name: string, flags: string | null) => (dispatch: any): void => {
  dispatch(setLoading(true));
  console.log("123123");
  
  Axios.post(`${urlDataServ}/childrens`, {parent_id, name, flags})
    .then(({ data }) => {
      console.log(data);
      
      // dispatch(setChildrens(data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      console.error(e);
    })
}

export const fetchChildrensByIdCategory = (id:number) => (dispatch: any): void => {
  dispatch(setLoading(true));
  dispatch(setActiveIdCategory(id));
  Axios.get(`${urlDataServ}/childrens?parent_id=${id}`)
    .then(({ data }) => {
      dispatch(setChildrens(data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      console.error(e);
    })
}


