import Axios from "axios";
import { TCategory } from "../../mainTypes";

const urlDataServ = "http://localhost:3004";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_ACTIVE_ID_CATEGORY = "SET_ACTIVE_ID_CATEGORY";
export const SET_LOADING = "SET_LOADING";

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

export type TSetActiveIdCategory = {
  type: typeof SET_ACTIVE_ID_CATEGORY,
  payload: number | null
}

export const setActiveIdCategory = (id: number | null): TSetActiveIdCategory => {
  return {
    type: SET_ACTIVE_ID_CATEGORY, 
    payload: id
  }
}


export type TSetCategories = {
  type: typeof SET_CATEGORIES,
  payload: TCategory[]
}

export const setCategories = (categories: TCategory[]): TSetCategories => {
  return {
    type: SET_CATEGORIES, 
    payload: categories
  }
}


export const fetchCategories = () => (dispatch: any): void => {
  dispatch(setLoading(true));
  Axios.get(`${urlDataServ}/categories`)
    .then(({ data }) => {
      dispatch(setCategories(data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      console.error(e);
    })
}


