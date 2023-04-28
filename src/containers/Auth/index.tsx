import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from 'components/Login';

interface LoginProps {}

const Auth: React.FC<LoginProps> = () => {
  const { pathname } = useLocation();
  return <Login isLogin={pathname === '/login'} />;
};

export default Auth;
