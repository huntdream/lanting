import React, { useCallback } from 'react';
import './style.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IComments } from 'typing/comment';
import { useUser } from 'context/App';
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
  const [request] = useRequest();
  const queryClient = useQueryClient();
  const { data } = useQuery<IComments>({
    queryKey: ['comments', type, id],
    queryFn: () => request(`/comments/${type}/${id}`),
  });
  const [user] = useUser();
  const { t } = useTranslation();

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['comments', type, id] });
  }, [queryClient, type, id]);

  const handleReplySuccess = () => {
    handleRefresh();
  };

  return (
    <div className='lanting-comments'>
      {type !== 'user' && (
        <div className='lanting-comments-header'>
          <Icon name='comment' />
          {t('comments.label')}
          <span className='lanting-comments-header-total'>
            {data?.data.length ? `(${data.total})` : null}
          </span>
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
            canReply={canReply}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
