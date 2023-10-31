import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import SWRProvider from 'context/SWR';
import './i18n';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Router>
    <SWRProvider>
      <App />
    </SWRProvider>
  </Router>
);
