import React, { useEffect, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './style.scss';
import { useRecoilState } from 'recoil';
import { themeState, Theme } from 'recoil/theme';
import SignUp from 'containers/SignUp';
import SignIn from 'containers/SignIn';
import ErrorBoundary from 'components/ErrorBoundary';
import Edit from 'containers/Edit';
import Feed from 'containers/Feed';
import Nav from 'components/Nav';
import history from 'utils/history';
import Article from 'containers/Article';

function App() {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    const prevTheme = (localStorage.getItem('theme') || 'light') as Theme;
    setTheme(prevTheme);

    document.body.classList.add('theme-fade');
  }, [setTheme]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <div className='lanting-app'>
        <Router history={history}>
          <Nav />
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route path='/' exact component={Feed} />
              <Route path='/signup' component={SignUp} />
              <Route path='/signin' component={SignIn} />
              <Route path='/edit' component={Edit} />
              <Route path='/article/:id' component={Article} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
