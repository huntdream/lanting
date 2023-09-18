import React from 'react';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import LantingEditor from 'components/LantingEditor';
import useArticle from 'api/useArticle';
import Date from 'components/Date';
import Icon from 'components/Icon';
import User from 'components/User';
import useRequest from 'hooks/useRequest';
import useToast from 'components/Toast/useToast';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';

interface ArticleProps {}

interface ArticleParams {
  id: string;
}

const Article: React.FC<ArticleProps> = () => {
  const { id = '' } = useParams<keyof ArticleParams>();
  const navigate = useNavigate();
  const [fetcher] = useRequest();
  const [toast] = useToast();
  const { t } = useTranslation();

  const { article } = useArticle(id);

  const navigateToEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    fetcher('/articles', {
      method: 'delete',
      data: {
        ids: [parseInt(id, 10)],
      },
    }).then((res) => {
      navigate('/');
      toast('Article deleted');
    });
  };

  return (
    <div className='lanting-article'>
      <h2 className='lanting-article-title'>{article?.title}</h2>
      <div className='lanting-article-meta'>
        {article?.author && <User user={article?.author} />}
        <Date date={article?.createdAt} />

        {article?.canEdit && (
          <div className='lanting-article-meta-actions'>
            <Tooltip title={t('edit')}>
              <Icon onClick={navigateToEdit} name='edit' />
            </Tooltip>
            <Tooltip title={t('delete')}>
              <Icon onClick={handleDelete} name='delete' />
            </Tooltip>
          </div>
        )}
      </div>
      <div className='lanting-article-content'>
        {article?.content && (
          <LantingEditor
            initialEditorState={article?.content}
            editable={false}
          />
        )}
      </div>
    </div>
  );
};

export default Article;
