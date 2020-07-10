import React from 'react';
import './style.scss';
import LantingEditor from 'components/LantingEditor';

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  return (
    <div className='edit'>
      <LantingEditor />
    </div>
  );
};

export default Edit;
