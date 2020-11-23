import React, { useEffect, Suspense, useMemo } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './style.scss';
import { useRecoilState } from 'recoil';
import { themeState, Theme } from 'recoil/theme';
import ErrorBoundary from 'components/ErrorBoundary';
import Nav from 'components/Nav';
import history from 'utils/history';
import routes from 'routes';

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

  const pages = useMemo(
    () =>
      routes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      )),
    []
  );

  return (
    <ErrorBoundary>
      <div className='lanting-app'>
        <Router history={history}>
          <Nav />
          <Suspense fallback={<div>Loading</div>}>
            <Switch>{pages}</Switch>
          </Suspense>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
