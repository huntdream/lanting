import { atom, selectorFamily, SerializableParam } from 'recoil';
import request from 'utils/request';

export interface IArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
}

export type IFeed = Data<IArticle>;

//Article
export const articleState = atom<IArticle>({
  key: 'article',
  default: {} as IArticle,
});

export const articleSelector = selectorFamily<IArticle, number>({
  key: 'articleSelector',
  get: (id: number) => async ({ get }) => {
    const response = await request.get<any, IArticle>(`/article/${id}`);

    return response;
  },
});

//Feed
export const feedState = atom<IFeed>({
  key: 'feed',
  default: {
    data: [],
    count: 0,
    total: 0,
  },
});

export const feedSelector = selectorFamily<
  IFeed,
  Pagination & SerializableParam
>({
  key: 'getFeed',
  get: (params) => async ({ get }) => {
    console.log('???');
    const response = await request
      .get<any, IFeed>('/article', {
        params,
      })
      .catch(() => {
        return get(feedState);
      });

    return response;
  },
});
