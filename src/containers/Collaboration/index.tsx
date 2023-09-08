import React from 'react';
import LantingEditor from 'components/LantingEditor';
import { useParams, useSearchParams } from 'react-router-dom';
import './style.scss';

interface Props {}

const Collaboration: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id') || 'test';

  return (
    <div className='lanting-collaboration'>
      <LantingEditor isCollab id={id} />
    </div>
  );
};

export default Collaboration;
