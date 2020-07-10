import React, { MouseEvent, ReactNode } from 'react';
import cls from 'classnames';
import './style.scss';

interface StyleButtonProps {
  active: boolean;
  className?: string;
  label: ReactNode | string;
  onToggle: () => void;
}

const StyleButton: React.FC<StyleButtonProps> = ({
  active,
  className,
  label,
  onToggle,
}) => {
  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    onToggle();
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={cls(
        'stylecontrols-button',
        {
          'stylecontrols-button--active': active,
        },
        className
      )}
    >
      {label}
    </div>
  );
};

export default StyleButton;
