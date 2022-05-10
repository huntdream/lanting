import React, {
  createContext,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react';
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

  useLayoutEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userData = JSON.parse(userString);

      setUser(userData);
    }
  }, []);

  const handleSetUser = (user?: IUser) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const context: IAppContext = {
    user,
    setUser: handleSetUser,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
