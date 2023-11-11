import Avatar from 'components/Avatar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'typing/user';
import './style.scss';

interface Props {
  user?: IUser;
  hideAvatar?: boolean;
}

const User: React.FC<Props> = ({ user, hideAvatar }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <div className='lanting-user' onClick={handleNavigate}>
      {!hideAvatar && <Avatar size='small' round src={user?.avatar} />}
      <div className='lanting-user-name'>{user?.name || user?.username}</div>
    </div>
  );
};

export default User;
