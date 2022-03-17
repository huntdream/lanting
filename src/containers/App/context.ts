import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface IAppContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<IAppContext>({
  theme: 'light',
} as IAppContext);

export default AppContext;
