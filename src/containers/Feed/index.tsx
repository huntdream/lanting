import React from 'react';
import Post from 'components/Post';

import { useRecoilValue } from 'recoil';
import { articleListState } from 'recoil/article';

import './style.scss';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const feed = useRecoilValue(
    articleListState({
      size: 20,
    })
  );

  console.log(feed);

  return (
    <div>
      {feed.data.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Feed;
