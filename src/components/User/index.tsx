import Avatar from 'components/Avatar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'typing/user';
import cls from 'classnames';
import './style.scss';

interface Props {
  user?: IUser;
  hideAvatar?: boolean;
  highlight?: boolean;
}

const User: React.FC<Props> = ({ user, hideAvatar, highlight }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <div className='lanting-user' onClick={handleNavigate}>
      {!hideAvatar && <Avatar size='small' round src={user?.avatar} />}
      <div
        className={cls('lanting-user-name', {
          'lanting-user-name--hl': highlight,
        })}
      >
        {user?.name || user?.username}
      </div>
    </div>
  );
};

export default User;
