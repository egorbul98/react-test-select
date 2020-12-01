import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {addName} from './func';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('should', () => {
  console.log(addName({isLoading: true, items: ["Првиет"]}));
  
  expect(1).toBe(1);
});
