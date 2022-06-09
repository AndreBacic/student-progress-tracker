import { render, screen } from '@testing-library/react';
import App from './App';

test('renders add report form', () => {
  render(<App />);
  const formSubmit = screen.getByRole('button');
  expect(formSubmit).toBeInTheDocument();
});

// check if grid table is rendered
test('renders grid table', () => {
  render(<App />);
  const gridTable = screen.getByRole('grid');
  expect(gridTable).toBeInTheDocument();
});
