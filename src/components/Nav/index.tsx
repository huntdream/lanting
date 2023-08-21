import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/Icon';
import ThemeToggle from 'components/ThemeToggle';
import useToast from 'components/Toast/useToast';
import { useUser } from 'context/App';

import './style.scss';
import Avatar from 'components/Avatar';
import Language from 'components/Language';
import DropDown from 'components/DropDown';
import Item from 'components/Item';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [toast] = useToast();
  const [user, setUser] = useUser();

  const isEditPage = useMemo(() => {
    return pathname === '/edit';
  }, [pathname]);

  const handleNavigateProfile = () => {
    if (user?.id) {
      navigate(`/profile/${user?.id}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleNotify = () => {
    toast('This feature is still work in progress');
  };

  const handleLogout = () => {
    setUser(undefined);
    localStorage.setItem('lanting-token', '');
    navigate('/');
    toast('See you again! 👋');
  };

  return (
    <nav className={classNames(`lanting-nav`)}>
      <div className='lanting-nav-inner'>
        <div className='lanting-nav-title'>
          <Link to='/' className='lanting-nav-link'>
            <h2 className='lanting-nav-name'>兰亭</h2>
          </Link>
          <div className='lanting-nav-bio'>小舟从此逝，江海寄余生</div>
        </div>

        <div className='lanting-nav-icons'>
          {!isEditPage && (
            <Link className='lanting-nav-edit' to='/edit'>
              <Icon clickable name='edit' />
            </Link>
          )}

          <Language />
          <ThemeToggle />
          <Icon onClick={handleNotify} name='notifications' />
          {user?.id ? (
            <DropDown label={<Avatar size='small' src={user?.avatar} round />}>
              <div className='lanting-nav-dropdown'>
                <Item onClick={handleNavigateProfile}>Profile</Item>
                <Item onClick={handleLogout}>Log out</Item>
              </div>
            </DropDown>
          ) : (
            <Icon name='login' onClick={handleNavigateProfile} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
