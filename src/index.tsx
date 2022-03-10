import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import './index.scss';
import App from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
