import React, { useEffect, useState } from 'react';
import './style.scss';
import LantingEditor from 'components/LantingEditor';
import Button from 'components/Button';
import Input from 'components/Input';
import request from 'utils/request';
import { IArticle } from 'typing/article';
import { useNavigate, useParams } from 'react-router-dom';
import useArticle from 'api/useArticle';

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { article } = useArticle(id, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (article) {
      setTitle(article.title);
    }
  }, [article]);

  const publish = () => {
    console.log('publishing');

    let content = '';
    let excerpt = '';

    request
      .post<any, IArticle>(`article/${id}`, {
        id: article?.id,
        title,
        excerpt,
        content,
      })
      .then((res) => {
        if (res.id) {
          navigate(`/article/${res.id}`);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='lanting-edit'>
      <div className='lanting-edit-header'>
        <Input
          borderless
          placeholder='Title'
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <Button onClick={publish}>Publish</Button>
      </div>
      <LantingEditor />
    </div>
  );
};

export default Edit;
