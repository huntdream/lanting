import { lazy, LazyExoticComponent } from 'react';

interface IRoute {
  name: string;
  path: string;
  element: LazyExoticComponent<any>;
}

const routes: IRoute[] = [
  {
    name: 'Lanting',
    path: '/',
    element: lazy(() => import('../containers/Feed')),
  },
  {
    name: 'Article',
    path: '/article/:id',
    element: lazy(() => import('../containers/Article')),
  },
  {
    name: 'Login',
    path: '/login',
    element: lazy(() => import('../containers/Login')),
  },
  {
    name: 'Sign Up',
    path: '/signup',
    element: lazy(() => import('../containers/SignUp')),
  },
  {
    name: 'New Story',
    path: '/edit/',
    element: lazy(() => import('../containers/Edit')),
  },
  {
    name: 'Edit',
    path: '/edit/:id',
    element: lazy(() => import('../containers/Edit')),
  },
  {
    name: 'Profile',
    path: '/profile/:id',
    element: lazy(() => import('../containers/Profile')),
  },
];

export default routes;
