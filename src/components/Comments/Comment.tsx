import React, { useState } from 'react';
import { IComment } from 'typing/comment';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import useToast from 'components/Toast/useToast';
import User from 'components/User';
import Date from 'components/Date';
import { useNavigate } from 'react-router-dom';
import useRequest from 'hooks/useRequest';
import { useTranslation } from 'react-i18next';
import Prompt from 'components/Prompt';
import './style.scss';
import Reply from './Reply';
import Button from 'components/Button';

interface Props {
  comment: IComment;
  showDetail?: boolean;
  canReply?: boolean;
  refresh: () => void;
}

const Comment: React.FC<Props> = ({
  comment,
  showDetail,
  canReply,
  refresh,
}) => {
  const navigate = useNavigate();
  const [toast] = useToast();
  const [fetcher] = useRequest();
  const { t } = useTranslation();
  const [showReply, setShowReply] = useState(false);

  const { id, replier, canDelete, createdAt, text, article, articleId } =
    comment;

  const handleViewArticle = (articleId: number) => {
    navigate(`/article/${articleId}`);
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
        refresh();
      });
  };

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  const handleReplySuccess = () => {
    setShowReply(false);
    refresh();
  };

  return (
    <div className='lanting-comments-comment'>
      <Avatar src={replier.avatar} round />
      <div className='lanting-comments-wrapper'>
        <div className='lanting-comments-replier'>
          <div className='lanting-comments-replier-info'>
            <User user={replier} hideAvatar />
            <Date date={createdAt} fromNow icon={false} />
          </div>
          {canDelete && (
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
        <div className='lanting-comments-text'>
          {comment.interlocutorId && (
            <div className='lanting-comments-interlocutor'>
              <span>{t('comments.replyTo')}</span>
              <User hideAvatar user={comment.interlocutor} highlight />
            </div>
          )}
          <span>{comment.text}</span>
        </div>
        {showDetail && (
          <div
            className='lanting-comments-article'
            onClick={() => handleViewArticle(article.id)}
          >
            {article.title}
          </div>
        )}
        <div className='lanting-comments-actions'>
          {canReply && (
            <Button icon='reply' onClick={handleShowReply} variant='text'>
              {t('comments.comment')}
            </Button>
          )}
        </div>
        {showReply && canReply && (
          <Reply to={comment} id={articleId} onSuccess={handleReplySuccess} />
        )}
        {comment.comments?.map((c) => (
          <Comment
            refresh={refresh}
            comment={c}
            key={c.id}
            canReply={canReply}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
