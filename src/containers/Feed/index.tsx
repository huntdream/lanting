import React, { useState, useEffect } from 'react';
import Post from 'components/Post';
import './style.scss';
import { IFeed } from 'typing/article';
import request from 'utils/request';
import Exception from 'components/Exception';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const [feed, setFeed] = useState<IFeed>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    request
      .get<any, IFeed>('article')
      .then((res) => setFeed(res))
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <Exception>Something went wrong</Exception>;
  }

  return (
    <div className='lanting-feed'>
      {feed?.data.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
