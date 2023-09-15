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
import Tooltip from 'components/Tooltip';

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

  const renderUserIcon = () => {
    if (['/signup', '/login'].includes(pathname)) {
      return null;
    }

    if (user?.id) {
      return (
        <DropDown label={<Avatar size='small' src={user?.avatar} round />}>
          <div className='lanting-nav-dropdown'>
            <Item onClick={handleNavigateProfile} icon='account_circle'>
              Profile
            </Item>
            <Item onClick={handleLogout} icon='logout'>
              Log out
            </Item>
          </div>
        </DropDown>
      );
    }

    return <Icon name='login' onClick={handleNavigateProfile} />;
  };

  return (
    <nav className={classNames(`lanting-nav`)}>
      <div className='lanting-nav-inner'>
        <div className='lanting-nav-title'>
          <Link to='/' className='lanting-nav-link'>
            <div className='lanting-nav-bio'>
              <span>小舟从此逝，</span>江海寄余生
            </div>
          </Link>
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
          {renderUserIcon()}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
