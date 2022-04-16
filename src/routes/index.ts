import { lazy } from 'react';

const routes = [
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
    name: 'Sign In',
    path: '/signin',
    element: lazy(() => import('../containers/SignIn')),
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
];

export default routes;
