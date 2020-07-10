import React, { useEffect } from 'react';
import { range } from 'lodash';
import './style.scss';
import Post from 'components/Post';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <div className='index'>
      {range(10).map((item) => (
        <Post key={item} />
      ))}
    </div>
  );
};

export default Index;
