import React from 'react';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Feed = lazy(() => import('../containers/Feed'));
const Article = lazy(() => import('../containers/Article'));
const Auth = lazy(() => import('../containers/Auth'));
const Edit = lazy(() => import('../containers/Edit'));
const Profile = lazy(() => import('../containers/Profile'));
const ProfileEdit = lazy(() => import('../containers/Profile/Edit'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Feed />,
  },
  {
    path: '/article/:id',
    element: <Article />,
  },
  {
    path: '/login',
    element: <Auth isLogin />,
  },
  {
    path: '/signup',
    element: <Auth />,
  },
  {
    path: '/edit/',
    element: <Edit />,
  },
  {
    path: '/edit/:id',
    element: <Edit />,
  },
  {
    path: '/profile',
    children: [
      {
        path: '/profile/edit',
        element: <ProfileEdit />,
      },
      {
        path: '/profile/:id/:type?',
        element: <Profile />,
      },
    ],
  },
];

export default routes;
