import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create order button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Create Order/i);
  expect(buttonElement).toBeInTheDocument();
});