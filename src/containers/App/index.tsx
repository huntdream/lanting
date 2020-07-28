import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from 'containers/Index';
import './style.scss';
import { useRecoilState } from 'recoil';
import { themeState, Theme } from 'recoil/theme';
import SignUp from 'containers/SignUp';
import SignIn from 'containers/SignIn';
import ErrorBoundary from 'components/ErrorBoundary';

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
      <BrowserRouter>
        <div className='app'>
          <Switch>
            <Route path='/signup' exact component={SignUp} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/' component={Index} />
          </Switch>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
