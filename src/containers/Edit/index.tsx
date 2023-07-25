import React, { useEffect, useRef, useState } from 'react';
import LantingEditor from 'components/LantingEditor';
import Button from 'components/Button';
import Input from 'components/Input';
import { IArticle } from 'typing/article';
import { useNavigate, useParams } from 'react-router-dom';
import useArticle from 'api/useArticle';
import { $getRoot, EditorState } from 'lexical';
import useRequest from 'hooks/useRequest';
import Visibility from './Visibility';

import './style.scss';
import { useTranslation } from 'react-i18next';

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  const { id = '' } = useParams<{ id: string }>();
  const ref = useRef<EditorState>();
  const [request] = useRequest();
  const { t } = useTranslation();

  const { article: articleData } = useArticle(id, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [article, setArticle] = useState<IArticle>({
    visibility: 1,
    title: '',
  } as IArticle);

  const navigate = useNavigate();

  useEffect(() => {
    if (articleData) {
      setArticle(articleData);
    }
  }, [articleData]);

  const handleChange = (key: keyof IArticle, value: any) => {
    setArticle({ ...article, [key]: value });
  };

  const publish = () => {
    if (!ref.current) return;

    const content = JSON.stringify(ref.current);

    const text = ref.current.read(() => $getRoot().getTextContent());

    const excerpt = text.split('\n').filter(Boolean)[0];

    console.log(text, excerpt);

    request
      .post<any, IArticle>(`article/${id}`, {
        ...article,
        id: article?.id,
        excerpt,
        content,
        text,
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
          placeholder={t('article.title')}
          value={article?.title}
          onChange={({ target: { value } }) => handleChange('title', value)}
        />
      </div>
      <div className='lanting-edit-actions'>
        <Visibility
          value={article?.visibility !== 2}
          onChange={(value) => handleChange('visibility', value ? 1 : 2)}
        />
        <Button onClick={publish} disabled={!article?.title}>
          {id ? t('article.save') : t('article.publish')}
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
