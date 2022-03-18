import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { SWRConfig } from 'swr';
import request from 'utils/request';

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById('root')
);
