import Avatar from 'components/Avatar';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from 'typing/user';
import './style.scss';

interface Props {}

const Profile: React.FC<Props> = () => {
  const { id } = useParams();
  const { data } = useSWR<IUser>(`/user/${id}`);

  console.log(data);

  return (
    <div className='lanting-profile'>
      <div className='lanting-profile-header'>
        <div className='lanting-profile-avatar'>
          <Avatar src={data?.avatar} />
        </div>
        <div className='lanting-profile-name'>{data?.name}</div>
      </div>
    </div>
  );
};

export default Profile;
