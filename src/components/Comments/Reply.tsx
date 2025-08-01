import React, { ChangeEvent, useState } from 'react';
import './style.scss';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import useRequest from 'hooks/useRequest';
import { t } from 'i18next';
import { useUser } from 'context/App';
import { IComment } from 'typing/comment';
import { useMutation } from '@tanstack/react-query';

interface Props {
  id: number;
  to?: IComment;
  onSuccess?: (comment: IComment) => void;
}

const Reply: React.FC<Props> = ({ id, to, onSuccess }) => {
  const [replyText, setReplyText] = useState('');
  const [fetcher] = useRequest();
  const [user] = useUser();

  const mutation = useMutation({
    mutationFn: (payload: Partial<IComment>) => {
      return fetcher.post<any, IComment>('/comments', payload);
    },
    onSuccess: (res) => {
      setReplyText('');
      if (onSuccess) {
        onSuccess(res);
      }
    },
  });

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleSubmit = () => {
    const payload: Partial<IComment> = {
      articleId: id,
      text: replyText,
      parentId: to?.parentId || to?.id,
      interlocutorId: to?.replierId,
    };

    mutation.mutate(payload);
  };

  const placeholder = to?.replierId
    ? `${t('comments.replyTo')} ${to.replier.name || to.replier.username}`
    : t('comments.placeholder');

  return (
    <div className='lanting-comments-reply'>
      <div className='lanting-comments-reply-content'>
        <Avatar src={user?.avatar} round />
        <textarea
          className='lanting-comments-textarea'
          placeholder={placeholder}
          value={replyText}
          onChange={handleReplyChange}
        />
      </div>
      <div className='lanting-comments-reply-action'>
        <Button
          color='primary'
          className='lanting-comments-reply-publish'
          disabled={!replyText}
          loading={mutation.isPending}
          onClick={handleSubmit}
        >
          {t('article.publish')}
        </Button>
      </div>
    </div>
  );
};

export default Reply;
