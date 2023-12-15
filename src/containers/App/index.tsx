import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary';
import Nav from 'components/Nav';
import routes from 'routes';
import Loading from 'components/Loading';
import ThemeProvider from 'context/Theme';
import AppProvider from 'context/App';
import Toast from 'components/Toast';

import './style.scss';

function App() {
  const pages = useRoutes(routes);

  return (
    <AppProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Toast>
            <div className='lanting-app'>
              <Nav />
              <main className='lanting-app-main'>
                <Suspense fallback={<Loading loading />}>{pages}</Suspense>
              </main>
            </div>
          </Toast>
        </ErrorBoundary>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
