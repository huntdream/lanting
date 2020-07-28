import React from 'react';
import './style.scss';
import { IArticle } from 'recoil/article';

interface PostProps extends IArticle {}

const Post: React.FC<PostProps> = ({ id, title, content }) => {
  return (
    <article className='lanting-post'>
      <header className='lanting-post-header'>
        <h3 className='lanting-post-title'>{title}</h3>
      </header>
      <main className='lanting-post-content'>{content}</main>
      <footer className='lanting-post-footer'></footer>
    </article>
  );
};

export default Post;
