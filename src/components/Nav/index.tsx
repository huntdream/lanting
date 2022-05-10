import React, { useMemo } from 'react';
import classNames from 'classnames';
import './style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/Icon';

import ThemeToggle from 'components/ThemeToggle';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isEditPage = useMemo(() => {
    return pathname === '/edit';
  }, [pathname]);

  const handleAccountClick = () => {
    navigate('/signin');
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
        {!isEditPage && (
          <Link className='lanting-nav-edit' to='/edit'>
            <Icon clickable>edit</Icon>
          </Link>
        )}
        <ThemeToggle />
        <Icon onClick={handleAccountClick}>account_circle</Icon>
      </div>
    </nav>
  );
};

export default Nav;
