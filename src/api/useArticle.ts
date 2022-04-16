import { ContentState, convertFromRaw } from 'draft-js';
import useSWR, { SWRConfiguration } from 'swr';
import request from 'utils/request';

export interface IArticle {
  id: number;
  title: string;
  content: ContentState;
  excerpt: string;
  createdAt?: string;
}

const fetcher = (url: string) =>
  request(url).then((article: any) => {
    if (article) {
      const { content } = article;
      if (content) {
        return {
          ...article,
          content: convertFromRaw(JSON.parse(content)),
        };
      }
    }

    return article;
  });

const useArticle = (id: string, config?: SWRConfiguration<IArticle>) => {
  const { data, error } = useSWR<IArticle>(
    id ? `/article/${id}` : null,
    fetcher,
    config
  );

  return {
    article: data,
    isLoading: !error && !data,
    error,
  };
};

export default useArticle;
