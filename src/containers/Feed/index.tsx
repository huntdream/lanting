import React, { useState, useEffect } from 'react';
import Post from 'components/Post';

import './style.scss';
import { IFeed } from 'recoil/article';
import request from 'utils/request';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const [feed, setFeed] = useState<IFeed>();

  useEffect(() => {
    request.get<any, IFeed>('article').then((res) => setFeed(res));
  }, []);

  return (
    <div className='lanting-feed'>
      {feed?.data.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
