import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IUser } from 'typing/user';
import useRequest from 'hooks/useRequest';

interface IAppContext {
  user?: IUser;
  setUser: (user?: IUser) => void;
}

export const AppContext = createContext({} as IAppContext);

interface Props {
  children?: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [request] = useRequest();
  const { data } = useQuery<IUser>({
    queryKey: ['user', 'me'],
    queryFn: () => request('/user/me'),
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  const context: IAppContext = {
    user,
    setUser,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
