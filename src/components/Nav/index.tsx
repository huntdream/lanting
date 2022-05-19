import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/Icon';
import ThemeToggle from 'components/ThemeToggle';
import useToast from 'components/Toast/useToast';

import './style.scss';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [toast] = useToast();

  const isEditPage = useMemo(() => {
    return pathname === '/edit';
  }, [pathname]);

  const handleAccountClick = () => {
    navigate('/signin');
  };

  const handleNotify = () => {
    toast('Hello world');
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
              <Icon clickable>edit</Icon>
            </Link>
          )}
          <ThemeToggle />
          <Icon onClick={handleNotify}>notifications</Icon>
          <Icon onClick={handleAccountClick}>account_circle</Icon>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
