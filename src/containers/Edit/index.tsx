import React from 'react';
import './style.scss';
import MyEditor from 'components/MyEditor';

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  return (
    <div className='edit'>
      <MyEditor />
    </div>
  );
};

export default Edit;
