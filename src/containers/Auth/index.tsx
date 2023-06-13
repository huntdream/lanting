import React from 'react';
import Login from 'components/Login';

interface LoginProps {
  isLogin?: boolean;
}

const Auth: React.FC<LoginProps> = ({ isLogin }) => {
  return <Login isLogin={isLogin} />;
};

export default Auth;
