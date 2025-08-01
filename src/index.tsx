import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import TanStackQueryProvider from 'context/TanStackQuery';
import './i18n';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Router>
    <TanStackQueryProvider>
      <App />
    </TanStackQueryProvider>
  </Router>
);
