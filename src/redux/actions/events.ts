import Axios from "axios";
import { TEvent } from "../../mainTypes";

export const ADD_EVENT = "ADD_EVENT";
export const CLEAR_EVENTS = "REMOVE_EVENTS";

export type TClearEvents = {
  type: typeof CLEAR_EVENTS
}

export const clearEvents = (): TClearEvents => {
  return {
    type: CLEAR_EVENTS
  }
}

export type TAddEvent = {
  type: typeof ADD_EVENT,
  payload: {eventName: string, eventValue: string}
}

export const addEvent = (eventName: string, eventValue: string): TAddEvent => {
  return {
    type: ADD_EVENT, 
    payload: {eventName, eventValue}
  }
}

