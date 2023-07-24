import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';
import request from 'utils/request';
import './i18n';
import '@material-design-icons/font/filled.css';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Router>
    <SWRConfig
      value={{
        fetcher: request,
        revalidateOnMount: true,
      }}
    >
      <App />
    </SWRConfig>
  </Router>
);
