import React from 'react';
import Post from 'components/Post';
import './style.scss';
import { IFeed } from 'typing/article';
import useSWR from 'swr';
import Loading from 'components/Loading';

interface FeedProps {
  id?: string;
}

const Feed: React.FC<FeedProps> = ({ id = '' }) => {
  const { data: feed, isLoading } = useSWR<IFeed>(`articles/${id}`);

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
