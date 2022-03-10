import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import './style.scss';
import { useRecoilState } from 'recoil';
import { themeState, Theme } from 'recoil/theme';
import ErrorBoundary from 'components/ErrorBoundary';
import Nav from 'components/Nav';
import routes from 'routes';
import Loading from 'components/Loading';

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

  const pages = useRoutes(
    routes.map(({ path, element: Component }) => ({
      path,
      element: (
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      ),
    }))
  );

  return (
    <ErrorBoundary>
      <div className='lanting-app'>
        <Nav />
        <main className='lanting-app-main'>{pages}</main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
