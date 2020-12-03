import { TEvent} from "../../mainTypes";
import { ADD_EVENT, CLEAR_EVENTS, TAddEvent, TClearEvents} from "../actions/events";

const initialState = {
  items: [] as TEvent[]
}
export type StateEventsType = typeof initialState;
 
type ActionsTypes = TAddEvent | TClearEvents;

export const eventsReducer = (state = initialState, action:ActionsTypes):StateEventsType => {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, items: [...state.items, {...action.payload, id:state.items.length}] };
    case CLEAR_EVENTS:
      return initialState;
    
    default:
      return state;
  }
}
