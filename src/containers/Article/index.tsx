import React from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import LantingEditor from 'components/LantingEditor';
import useArticle from 'api/useArticle';
import Date from 'components/Date';
import Icon from 'components/Icon';

interface ArticleProps {}

interface ArticleParams {
  id: string;
}

const Article: React.FC<ArticleProps> = () => {
  const { id = '' } = useParams<keyof ArticleParams>();
  const navigate = useNavigate();

  const { article } = useArticle(id);

  const navigateToEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className='lanting-article'>
      <h2 className='lanting-article-title'>{article?.title}</h2>
      <div className='lanting-article-meta'>
        <Date date={article?.createdAt} />
        <Icon onClick={navigateToEdit} className='lanting-article-meta-edit'>
          edit
        </Icon>
      </div>
      <div className='lanting-article-content'>
        <LantingEditor />
      </div>
    </div>
  );
};

export default Article;
