import Avatar from 'components/Avatar';
import React from 'react';
import './style.scss';

interface Props {}

const Profile: React.FC<Props> = () => {
  return (
    <div className='lanting-profile'>
      <div className='lanting-profile-header'>
        <div className='lanting-profile-avatar'>
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
