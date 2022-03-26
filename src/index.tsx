import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';
import request from 'utils/request';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Router>
      <SWRConfig
        value={{
          fetcher: request,
        }}
      >
        <App />
      </SWRConfig>
    </Router>
  </React.StrictMode>
);
