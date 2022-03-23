import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import './style.scss';

import ErrorBoundary from 'components/ErrorBoundary';
import Nav from 'components/Nav';
import routes from 'routes';
import Loading from 'components/Loading';
import ThemeProvider from 'context/Theme';

function App() {
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
    <ThemeProvider>
      <ErrorBoundary>
        <div className='lanting-app'>
          <Nav />
          <main className='lanting-app-main'>{pages}</main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
