import React from 'react';
import './style.scss';
import { IArticle } from 'recoil/article';
import { Link } from 'react-router-dom';
import Date from 'components/Date';

interface PostProps extends IArticle {}

const Post: React.FC<PostProps> = ({
  id,
  title,
  content,
  excerpt,
  createdAt,
}) => {
  return (
    <article className='lanting-post'>
      <header className='lanting-post-header'>
        <Link to={`/article/${id}`} className='lanting-post-anchor'>
          <h3 className='lanting-post-title'>{title}</h3>
        </Link>
      </header>
      <main className='lanting-post-content'>{excerpt}</main>
      <footer className='lanting-post-footer'>
        <Date date={createdAt} />
      </footer>
    </article>
  );
};

export default Post;
