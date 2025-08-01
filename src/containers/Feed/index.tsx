import React from 'react';
import Post from 'components/Post';
import './style.scss';
import { IFeed } from 'typing/article';
import { useQuery } from '@tanstack/react-query';
import useRequest from 'hooks/useRequest';
import Loading from 'components/Loading';

interface FeedProps {
  id?: string;
}

const Feed: React.FC<FeedProps> = ({ id = '' }) => {
  const [request] = useRequest();
  const { data: feed, isLoading } = useQuery<IFeed>({
    queryKey: ['feed', id],
    queryFn: () => request(`articles/${id}`),
  });

  if (isLoading) {
    return <Loading loading />;
  }

  if (!feed?.data?.length) {
    return (
      <div className='lanting-feed-empty'>Guess what? Nothing here 😢</div>
    );
  }

  return (
    <div className='lanting-feed'>
      {feed?.data?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
