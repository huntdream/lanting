import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from 'containers/Index';
import Edit from 'containers/Edit';
import './style.scss';
import Nav from 'components/Nav';

function App() {
  useEffect(() => {
    localStorage.setItem('color-mode', 'light');
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
        <Nav />

        <Route path='/' exact component={Index} />
        <Switch>
          <Route path='/edit' component={Edit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
