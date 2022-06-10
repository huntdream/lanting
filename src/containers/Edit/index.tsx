import React, { useEffect, useRef, useState } from 'react';
import LantingEditor from 'components/LantingEditor';
import Button from 'components/Button';
import Input from 'components/Input';
import { IArticle } from 'typing/article';
import { useNavigate, useParams } from 'react-router-dom';
import useArticle from 'api/useArticle';
import { EditorState } from 'lexical';

import './style.scss';
import useRequest from 'hooks/useRequest';

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  const { id = '' } = useParams<{ id: string }>();
  const ref = useRef<EditorState>();
  const [request] = useRequest();

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

    const content = JSON.stringify(ref.current);

    const excerpt = '';

    console.log(content);

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

  const handleEditorChange = (editorState: EditorState) => {
    ref.current = editorState;
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
        <Button onClick={publish} disabled={!title}>
          Publish
        </Button>
      </div>
      <LantingEditor
        onChange={handleEditorChange}
        initialEditorState={article?.content}
      />
    </div>
  );
};

export default Edit;
