import React, {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import useSWR from 'swr';
import { IUser } from 'typing/user';

interface IAppContext {
  user?: IUser;
  setUser: (user: IUser) => void;
}

export const AppContext = createContext({} as IAppContext);

interface Props {
  children?: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const { data } = useSWR('/user/me');

  useEffect(() => {
    handleSetUser(data);
  }, [data]);

  const handleSetUser = (user?: IUser) => {
    setUser(user);
  };

  const context: IAppContext = {
    user,
    setUser: handleSetUser,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
