import React, { ChangeEvent, useState } from 'react';
import './style.scss';
import useSWR, { useSWRConfig } from 'swr';
import { IComments } from 'typing/comment';
import User from 'components/User';
import Avatar from 'components/Avatar';
import Date from 'components/Date';
import { useUser } from 'context/App';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import useRequest from 'hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/Icon';
import Prompt from 'components/Prompt';
import useToast from 'components/Toast/useToast';

interface Props {
  id: string;
  type: 'article' | 'user';
  showDetail?: boolean;
  presentation?: boolean;
}

const Comments: React.FC<Props> = ({ id, type, presentation, showDetail }) => {
  const { mutate } = useSWRConfig();
  const { data } = useSWR<IComments>(`/comments/${type}/${id}`);
  const [user] = useUser();
  const { t } = useTranslation();
  const [replyText, setReplyText] = useState('');
  const [fetcher] = useRequest();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [toast] = useToast();

  const handleViewArticle = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleDelete = (commentId: number) => {
    const payload = {
      ids: [commentId],
    };

    return fetcher
      .delete('/comments', {
        data: payload,
      })
      .then(() => {
        toast('Comment deleted');
        mutate(`/comments/${type}/${id}`);
      });
  };

  const handleSubmit = () => {
    const payload = {
      articleId: parseInt(id),
      text: replyText,
    };

    setLoading(true);

    fetcher
      .post('/comments', payload)
      .then((res) => {
        setReplyText('');
        mutate(`/comments/${type}/${id}`);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className='lanting-comments'>
      {type !== 'user' && (
        <div className='lanting-comments-header'>
          <Icon name='comment' />
          {t('comments.label')}
        </div>
      )}
      {user?.id && !presentation && (
        <div className='lanting-comments-reply'>
          <div className='lanting-comments-reply-content'>
            <Avatar src={user?.avatar} round />
            <textarea
              className='lanting-comments-textarea'
              placeholder={t('comments.placeholder')}
              value={replyText}
              onChange={handleReplyChange}
            />
          </div>
          <div className='lanting-comments-reply-action'>
            <Button
              color='primary'
              className='lanting-comments-reply-publish'
              disabled={!replyText || loading}
              onClick={handleSubmit}
            >
              {t('article.publish')}
            </Button>
          </div>
        </div>
      )}
      <div className='lanting-comments-list'>
        {data?.data?.map(
          ({ id, text, replier, createdAt, article, canDelete }) => (
            <div className='lanting-comments-comment' key={id}>
              <Avatar src={replier.avatar} round />
              <div className='lanting-comments-content'>
                <div className='lanting-comments-replier'>
                  <div className='lanting-comments-replier-info'>
                    <User user={replier} hideAvatar />
                    <Date date={createdAt} fromNow icon={false} />
                  </div>
                  {canDelete && type !== 'user' && (
                    <Prompt
                      title={t('delete')}
                      message={t('deleteMessage', {
                        type: t('comments.comment'),
                      })}
                      onOk={() => handleDelete(id)}
                    >
                      <Icon name='delete' clickable />
                    </Prompt>
                  )}
                </div>
                <div className='lanting-comments-text'>{text}</div>
                {showDetail && (
                  <div
                    className='lanting-comments-article'
                    onClick={() => handleViewArticle(article.id)}
                  >
                    {article.title}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Comments;
