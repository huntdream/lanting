import { atom, selectorFamily, SerializableParam } from 'recoil';
import request from 'utils/request';

export interface IArticle {
  id: number;
  title: string;
  content: string;
}

export type IFeed = Data<IArticle>;

export const articleState = atom<IFeed>({
  key: 'article',
  default: {
    data: [],
    count: 0,
    total: 0,
  },
});

export const articleListState = selectorFamily<
  IFeed,
  Pagination & SerializableParam
>({
  key: 'ArticleList',
  get: (param) => async ({ get }) => {
    const response = await request
      .get<any, IFeed>('/article', {
        params: param,
      })
      .catch(() => {
        return get(articleState);
      });

    return response;
  },
});
