import { atom } from 'recoil';

export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  bio: string;
}

export const userState = atom<IUser | null>({
  key: 'user',
  default: null,
});
