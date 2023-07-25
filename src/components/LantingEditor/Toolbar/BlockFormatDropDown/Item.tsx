import Icon from 'components/Icon';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  icon?: string;
  onClick?: () => void;
}

const DropDownItem: FC<Props> = ({ children, icon, onClick }) => {
  return (
    <div className='lanting-editor-dropdown-item' onClick={onClick}>
      {icon && <Icon name={icon} />}
      {children}
    </div>
  );
};

export default DropDownItem;
