import React from 'react';
import cls from 'classnames';
import './style.scss';

interface MarkButtonProps {
  format: string;
  icon: string;
  active: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const MarkButton: React.FC<MarkButtonProps> = ({
  icon,
  active,
  onMouseDown,
}) => {
  return (
    <i
      className={cls('material-icons mark-button', {
        'mark-button--active': active,
      })}
      onMouseDown={onMouseDown}
    >
      {icon}
    </i>
  );
};

export default MarkButton;
