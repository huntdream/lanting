import useToast from 'components/Toast/useToast';
import useRequest from 'hooks/useRequest';
import useSWR, { SWRConfiguration } from 'swr';
import { IArticle } from 'typing/article';

const useArticle = (id: string, config?: SWRConfiguration<IArticle>) => {
  const [request] = useRequest();
  const [toast] = useToast();

  const fetcher = (url: string) =>
    request(url)
      .then((article: any) => {
        return article;
      })
      .catch((reason) => {
        toast(reason.message);
      });

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
