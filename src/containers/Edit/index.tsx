import React, { useState } from 'react';
import './style.scss';
import LantingEditor from 'components/LantingEditor';
import { ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Button from 'components/Button';
import Input from 'components/Input';
import request from 'utils/request';
import { IArticle } from 'recoil/article';
import { useHistory } from 'react-router-dom';

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const onChange = (rawContent: ContentState) => {
    const html = stateToHTML(rawContent);

    console.log(html);
    setValue(html);
  };

  const publish = () => {
    console.log('publishing');
    request
      .post<any, IArticle>('article', {
        title,
        content: value,
      })
      .then((res) => {
        if (res.id) {
          history.push(`/article/${res.id}`);
        } else {
          history.push('/');
        }
      });
  };

  return (
    <div className='lanting-edit'>
      <div className='lanting-edit-header'>
        <Input
          placeholder='Title'
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <Button onClick={publish}>Publish</Button>
      </div>
      <LantingEditor onChange={onChange} />
    </div>
  );
};

export default Edit;
