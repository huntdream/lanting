import React from 'react';
import './style.scss';
import { useRecoilValue } from 'recoil';
import { articleSelector } from 'recoil/article';
import { useParams } from 'react-router-dom';

interface ArticleProps {}

interface ArticleParams {
  id: string;
}

const Article: React.FC<ArticleProps> = () => {
  const { id } = useParams<ArticleParams>();

  const article = useRecoilValue(articleSelector(parseInt(id, 10)));

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
