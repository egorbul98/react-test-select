import React from 'react';
import {categoriesReducer} from './categories';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const categoriesItems = [
  {
    "id": 0,
    "name": "Машины и транспортные средства",
    "flags": null
  },
  {
    "id": 1,
    "name": "Одежда",
    "flags": null
  }
]
const initialState = {
  items: categoriesItems,
  activeId: null,
  isLoading: false
}
const oldLength = initialState.items.length;
describe('test categories reducer', () => {
  it('should add category', () => {
    const newItem = { "id": 2, "name": "Новый объект", "flags": null }
    const resultReducer = categoriesReducer(initialState, { type: "ADD_CATEGORY", payload: newItem });
    expect(resultReducer.items.length).toBe(oldLength+1);
  });

  it('should remove category', () => {
    const resultReducer = categoriesReducer(initialState, { type: "REMOVE_CATEGORY", payload: 1 });
    expect(resultReducer.items.length).toBe(oldLength-1);
  });

  it('should change category', () => {
    const newItem = { "id": 0, "name": "Новое название", "flags": "новый флаг" }
    const resultReducer = categoriesReducer(initialState, { type: "CHANGE_CATEGORY", payload: newItem });
    expect(resultReducer.items[0]).toEqual(newItem);
  });
  
});

