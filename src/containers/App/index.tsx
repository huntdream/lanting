import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from 'containers/Index';
import Edit from 'containers/Edit';
import './style.scss';

function App() {
  useEffect(() => {
    localStorage.setItem('color-mode', 'light');
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
        <Route path='/' exact component={Index} />
        <Switch>
          <Route path='/new' component={Edit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
