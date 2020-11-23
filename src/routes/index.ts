import { lazy } from 'react';

const routes = [
  {
    name: 'Lanting',
    path: '/',
    exact: true,
    component: lazy(() => import('../containers/Feed')),
  },
  {
    name: 'Article',
    path: '/article/:id',
    component: lazy(() => import('../containers/Article')),
  },
  {
    name: 'Sign In',
    path: '/signin',
    component: lazy(() => import('../containers/SignIn')),
  },
  {
    name: 'Sign Up',
    path: '/signup',
    component: lazy(() => import('../containers/SignUp')),
  },
  {
    name: 'New Story',
    path: '/edit',
    component: lazy(() => import('../containers/Edit')),
  },
];

export default routes;
