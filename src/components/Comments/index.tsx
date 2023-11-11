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

interface Props {
  id: string;
  type: 'article' | 'user';
}

const Comments: React.FC<Props> = ({ id, type }) => {
  const { mutate } = useSWRConfig();
  const { data } = useSWR<IComments>(`/comments/${type}/${id}`);
  const [user] = useUser();
  const { t } = useTranslation();
  const [replyText, setReplyText] = useState('');
  const [fetcher] = useRequest();
  const [loading, setLoading] = useState(false);

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
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
      <div className='lanting-comments-header'>{t('comments.label')}</div>
      {user?.id && (
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
        {data?.data?.map(({ text, replier, createdAt }) => (
          <div className='lanting-comments-comment'>
            <div className='lanting-comments-replier'>
              <Avatar src={replier.avatar} round />
              <div>
                <User user={replier} hideAvatar />
              </div>
              <Date date={createdAt} fromNow icon={false} />
            </div>
            <div className='lanting-comments-text'>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
