import Axios from "axios";
import { TCategory } from "../../mainTypes";

export const SET_CATEGORIES = "SET_CATEGORIES";

export type TSetCategories = {
  type: typeof SET_CATEGORIES,
  payload: TCategory[]
}

export const setSearchText = (categories: TCategory[]): TSetCategories => {
  return {
    type: SET_CATEGORIES, 
    payload: categories
  }
}

// export const fetchComplexes = (region: string | null = null, filterItems: Array<FilterItemType> | null = null, filterItemsDiapason: Array<FilterItemDiapasonType> | null = null, sortBy: string | null = null) => (dispatch: any, getState: ()=>AppStateType): void => {
//   // filterItems - фильтры select'ов
//   // filterItemsDiapason - фильтры полей "от" и "до" типа "Стоимость" или "Площадь" 
  
//   dispatch(setLoading(true));
//   const filterState = getState().filter;

//   if (!region) { region = filterState.region; }
//   if (!filterItems || filterItems.length == 0) { filterItems = filterState.filterItems; }
//   if (!filterItemsDiapason || filterItemsDiapason.length == 0) { filterItemsDiapason = filterState.filterItemsDiapason; }
//   if (!sortBy) { sortBy = filterState.sortBy; }

//   let args = `&region=${region}&`;
//   // переменные, определяющие участвуют ли в фильтрации конкретные параметры. Если такие параметры есть, то будет происходить доп. фильтрация
//   let deadlinesValues:Array<string | number> | null = null;
//   let roomsValues: Array<string | number> | null = null;
  
//   if (filterItems && filterItems.length != 0) {
//     filterItems.forEach((item) => {
//       if (item.values.length) {
//         item.values.forEach((valItem) => {
//           if (item.type === "deadline") {
//             deadlinesValues = item.values.map((item) => {
//               return +item.value;
//             });
//           }else if (item.type === "rooms") {
//             roomsValues = item.values.map((item) => {
//               return item.value;
//             });
//           } else {
//             args += `${item.type}=${valItem.value}&`;
//           }
//         })
//       }
//     })
//   }
  

//   // args += `_page=${currentPage}&_limit=${perPage}`;
  
  
//   Axios.get(`${urlDataServ}/complexes?_embed=flats&${args}`)
//     .then(({ data, headers }) => {
     
//       const complexes = data.filter((complex: ComplexeType) => {
//         let inArray:boolean | undefined = true;
//         if (deadlinesValues) {
//           inArray = checkInArray(deadlinesValues, complex.deadline, "year");
//           if (!inArray) {
//             return false;
//           } 
//         }

//         if (roomsValues) {
//           inArray = checkInArray(roomsValues, complex.flats, "room");
//           if (!inArray) {
//             return false;
//           } 
//         }

//         complexAddProperties(complex);

        
//         if (filterItemsDiapason && filterItemsDiapason.length != 0) {
//           for (let i = 0; i < filterItemsDiapason.length; i++) {
//             const filterItem = filterItemsDiapason[i];
//             const nameProp: string = filterItem.type;
//             if (filterItem.from == 0 && filterItem.to == 0) {
//               continue;
//             }
//             inArray = complex.flats?.some((flat: any) => {
//               if (filterItem.to == 0) {
//                 return (+flat[nameProp] >= +filterItem.from) ? true : false;
//               } else {
//                 return (+flat[nameProp] >= +filterItem.from && +flat[nameProp] <= +filterItem.to) ? true : false;
//               }
//             });

//             if (!inArray) {
//               break;
//             }
//           }
//         }
        
//         if (!inArray) {
//           return false;
//         } 

        
//         return true;
//       })

//       dispatch(setTotalCount(headers["x-total-count"] ? +headers["x-total-count"] : complexes.length));
//       dispatch(setCurrentPage(1));
//       dispatch(setComplexes(complexes));
//       if (sortBy) {
//         dispatch(sortComplexes(sortBy));
//       }
//       dispatch(setLoading(false));
//     })
//     .catch((e) => {
//       console.error(e);
//       dispatch(setErrorText("Произошла ошибка при загрузке жилых комплексов :("));
//     })
// }
// export const fetchComplexesByIds = (region: string | null = null, arrFavoriteComplexesIds: Array<number> | null = null) => (dispatch: any, getState: ()=>AppStateType): void => {
  
//   // arrFavoriteComplexesIds - массив ID избранных комплексов
  
//   if (arrFavoriteComplexesIds && arrFavoriteComplexesIds.length === 0) {
//       dispatch(setCurrentPage(1));
//     dispatch(setComplexes([]));
//     dispatch(setTotalCount(0));
//     return;
//   }
//   dispatch(setLoading(true));
  
//   let args = `&region=${region}&`;
  
//   Axios.get(`${urlDataServ}/complexes?_embed=flats&${arrFavoriteComplexesIds?.map((id)=>"id="+id).join("&")}${args}`)
//     .then(({ data, headers }) => {
//       const complexes = data.map((complex: ComplexeType) => {
//         complexAddProperties(complex);
//         return complex;
//       })
//       updateDataComplexesInRedux(dispatch, complexes, headers["x-total-count"] ? +headers["x-total-count"] : complexes.length)
//     })
//     .catch((e) => {
//       console.error(e);
//       dispatch(setErrorText("Произошла ошибка при загрузке жилых комплексов :("));
//     })
// }


// export const fetchComplexesByText = (text:string | null = null) => (dispatch: any): void => {
  
//   dispatch(setLoading(true));
  
//   Axios.get(`${urlDataServ}/complexes?_embed=flats&name_like=${text}`)
//     .then(({ data, headers }) => {
//       const complexes = data.map((complex: ComplexeType) => {
//         complexAddProperties(complex);
//         return complex;
//       })
//       updateDataComplexesInRedux(dispatch, complexes, headers["x-total-count"] ? +headers["x-total-count"] : complexes.length)
//     })
//     .catch((e) => {
//       console.error(e);
//       dispatch(setErrorText("Произошла ошибка при загрузке жилых комплексов :("));
//     })
// }

// export const fetchDetailComplex = (id:number) => (dispatch: any): void => {
  
//   Axios.get(`${urlDataServ}/complexes?_embed=complexDetail&_embed=reviews&_embed=flats&id=${id}`)
//     .then(({data})=> {
//       if (!data[0]) {
//         console.log("НЕТ ТАКОГО");
//       } else {
//         data[0].complexDetail = data[0].complexDetail[0];
//         data[0].flatsGroupByRooms = getFlatsGroupByRooms(data[0].flats); //
//         dispatch(setDetailComplex(data[0]));
//         dispatch(setReviews(data[0].reviews));
//       }
      
//     }).catch((e) => {
//       console.error(e);
      
//     })
// }
