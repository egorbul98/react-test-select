import Axios from "axios";
import { TChildren } from "../../mainTypes";
import { setActiveIdCategory } from "./categories";

const urlDataServ = "http://localhost:3004";

export const SET_CHILDRENS = "SET_CHILDRENS";
export const SET_LOADING_CHILD = "SET_LOADING_CHILD";
export const ADD_CHILDREN = "ADD_CHILDREN";
export const REMOVE_CHILDREN = "REMOVE_CHILDREN";

export type TRemoveChildren = {
  type: typeof REMOVE_CHILDREN,
  payload: number
}

export const removeChildren = (id: number): TRemoveChildren => {
  return {
    type: REMOVE_CHILDREN, 
    payload: id
  }
}

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
  type: typeof SET_LOADING_CHILD,
  payload: boolean
}

export const setLoading = (isLoading: boolean): TSetLoading => {
  return {
    type: SET_LOADING_CHILD, 
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

export const removeChildrenInBD = (id: number) => (dispatch: any): void => {
  dispatch(setLoading(true));
  Axios.delete(`${urlDataServ}/childrens/${id}`)
    .then(({ data }) => {
      dispatch(removeChildren(id));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      console.error(e);
    })
}
// export const removeChildrensByParentIdInBD = (id: number) => (dispatch: any): void => {
//   Axios.delete(`${urlDataServ}/childrens/${id}`)
//     .then(({ data }) => {
//       dispatch(removeChildrens(id));
//     })
//     .catch((e) => {
//       console.error(e);
//     })
// }

export const addChildrenInBD = (parent_id: number, name: string, flags: string | null) => (dispatch: any): void => {
  dispatch(setLoading(true));
  Axios.post(`${urlDataServ}/childrens`, {parent_id, name, flags})
    .then(({ data }) => {
      dispatch(addChildren(data));
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


