import React, { createContext, ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';
import { IUser } from 'typing/user';

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
  const { data } = useSWR('/user/me');

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
