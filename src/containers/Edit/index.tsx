import React, { useEffect, useMemo, useState } from 'react';
import './style.scss';
import LantingEditor from 'components/LantingEditor';
import { convertToRaw, EditorState } from 'draft-js';
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
  const [value, setValue] = useState<EditorState>();

  const navigate = useNavigate();

  const rawContent = useMemo(() => {
    if (article?.content) {
      const content = EditorState.createWithContent(article.content);

      setValue(content);
      return content;
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
    }
  }, [article]);

  const onChange = (contentState: EditorState) => {
    setValue(contentState);
  };

  const publish = () => {
    console.log('publishing');

    let content = '';
    let excerpt = '';

    if (value) {
      const state = convertToRaw(value.getCurrentContent());

      content = JSON.stringify(state);
      excerpt = state.blocks.find((block) => block.text)?.text || '';
    }

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
      <LantingEditor onChange={onChange} rawContent={rawContent} />
    </div>
  );
};

export default Edit;
