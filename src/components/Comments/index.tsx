import React, { ChangeEvent, useCallback, useState } from 'react';
import './style.scss';
import useSWR, { useSWRConfig } from 'swr';
import { IComments } from 'typing/comment';
import Avatar from 'components/Avatar';
import { useUser } from 'context/App';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import useRequest from 'hooks/useRequest';
import Icon from 'components/Icon';
import Comment from './Comment';
import Reply from './Reply';

interface Props {
  id: string;
  type: 'article' | 'user';
  showDetail?: boolean;
  canReply?: boolean;
}

const Comments: React.FC<Props> = ({ id, type, canReply, showDetail }) => {
  const { data } = useSWR<IComments>(`/comments/${type}/${id}`);
  const { mutate } = useSWRConfig();
  const [user] = useUser();
  const { t } = useTranslation();

  const handleRefresh = useCallback(() => {
    mutate(`/comments/${type}/${id}`);
  }, []);

  const handleReplySuccess = () => {
    handleRefresh();
  };

  return (
    <div className='lanting-comments'>
      {type !== 'user' && (
        <div className='lanting-comments-header'>
          <Icon name='comment' />
          {t('comments.label')}
        </div>
      )}
      {user?.id && canReply && (
        <Reply id={parseInt(id)} onSuccess={handleReplySuccess} />
      )}
      <div className='lanting-comments-list'>
        {data?.data?.map((comment) => (
          <Comment
            comment={comment}
            key={comment.id}
            showDetail={showDetail}
            refresh={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
