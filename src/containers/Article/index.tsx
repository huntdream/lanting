import React from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

interface ArticleProps {}

interface ArticleParams {
  id: string;
}

const Article: React.FC<ArticleProps> = () => {
  const { id = '' } = useParams<keyof ArticleParams>();

  const { data: article = {} } = useSWR<any>(`/article/${id}`);

  return (
    <div className='lanting-article'>
      <h2 className='lanting-article-title'>{article?.title}</h2>
      <div
        className='lanting-article-content'
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </div>
  );
};

export default Article;
