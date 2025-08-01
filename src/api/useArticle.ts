import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useToast from 'components/Toast/useToast';
import useRequest from 'hooks/useRequest';
import { IArticle } from 'typing/article';

const useArticle = (id: string, options?: UseQueryOptions<IArticle>) => {
  const [request] = useRequest();
  const [toast] = useToast();

  const fetcher = (articleId: string) =>
    request(`/article/${articleId}`)
      .then((article: any) => {
        return article;
      })
      .catch((reason) => {
        toast(reason.message);
        throw reason;
      });

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<IArticle>({
    queryKey: ['article', id],
    queryFn: () => fetcher(id),
    enabled: !!id,
    ...options,
  });

  return {
    article,
    isLoading,
    error,
  };
};

export default useArticle;
