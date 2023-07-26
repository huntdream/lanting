import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/Icon';
import ThemeToggle from 'components/ThemeToggle';
import useToast from 'components/Toast/useToast';
import { useUser } from 'context/App';
import { useTranslation } from 'react-i18next';

import './style.scss';
import Avatar from 'components/Avatar';
import Language from 'components/Language';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [toast] = useToast();
  const [user] = useUser();
  const { i18n } = useTranslation();

  const isEditPage = useMemo(() => {
    return pathname === '/edit';
  }, [pathname]);

  const handleAccountClick = () => {
    if (user?.id) {
      navigate(`/profile/${user?.id}`);
    } else {
      navigate(`/login`);
    }
  };

  const handleNotify = () => {
    toast('This feature is still work in progress');
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
          <Avatar
            onClick={handleAccountClick}
            size='small'
            src={user?.avatar}
            round
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
