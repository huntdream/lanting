import React from 'react';
import Post from 'components/Post';
import './style.scss';
import { IFeed } from 'typing/article';
import useSWR from 'swr';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const { data: feed } = useSWR<IFeed>('article');

  return (
    <div className='lanting-feed'>
      {feed?.data?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
