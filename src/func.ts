
const initialState = {
  items: [] as string[],
  isLoading: false as boolean
}
type TInitialState = typeof initialState;
export function addName({isLoading, items}:TInitialState):TInitialState {
  
  return {isLoading: isLoading, items: items}
}

