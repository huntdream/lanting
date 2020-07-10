import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Nav from './index';

test('renders nav component', () => {
  const { getByText } = render(
    <Router>
      <Nav />
    </Router>
  );

  const name = getByText(/兰亭/);

  expect(name).toBeInTheDocument();
});
