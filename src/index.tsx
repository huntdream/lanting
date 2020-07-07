import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Apollo from 'components/Apollo';
import App from './containers/App';

ReactDOM.render(
  <React.StrictMode>
    <Apollo>
      <App />
    </Apollo>
  </React.StrictMode>,
  document.getElementById('root')
);
