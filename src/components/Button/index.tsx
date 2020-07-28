import React, { CSSProperties, ButtonHTMLAttributes } from 'react';
import cls from 'classnames';
import './style.scss';

type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  color?: ButtonColor;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  style,
  color = 'primary',
  ...props
}) => {
  return (
    <button
      {...props}
      className={cls(
        'lanting-button',
        `lanting-button--${color}`,
        { 'lanting-button--disabled': disabled },
        className
      )}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
