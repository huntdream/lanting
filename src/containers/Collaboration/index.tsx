import React from 'react';
import LantingEditor from 'components/LantingEditor';
import { useParams, useSearchParams } from 'react-router-dom';
import './style.scss';
import { useUser } from 'context/App';

interface Props {}

const Collaboration: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();
  const [user] = useUser();

  const id = searchParams.get('id') || 'test';

  return (
    <div className='lanting-collaboration'>
      <LantingEditor isCollab id={id} user={user?.id ? user : undefined} />
    </div>
  );
};

export default Collaboration;
