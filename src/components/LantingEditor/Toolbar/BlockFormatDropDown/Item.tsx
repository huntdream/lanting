import Icon, { IconNames } from 'components/Icon';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  icon?: IconNames;
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
