import React, { CSSProperties, ButtonHTMLAttributes, forwardRef } from 'react';
import cls from 'classnames';
import './style.scss';
import Icon from 'components/Icon';

type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  color?: ButtonColor;
  icon?: string;
  variant?: 'contained' | 'text';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      active,
      children,
      className,
      disabled,
      icon,
      style,
      variant = 'contained',
      color = 'primary',
      ...props
    },
    ref
  ) => {
    const iconOnly = icon && !children;

    return (
      <button
        {...props}
        ref={ref}
        className={cls(
          'lanting-button',
          `lanting-button-${variant}`,
          `lanting-button-${variant}--${color}`,
          {
            'lanting-button--disabled': disabled,
            'lanting-button-icon': iconOnly,
            'lanting-button--active': active,
          },
          className
        )}
        style={style}
        disabled={disabled}
      >
        {icon && <Icon>{icon}</Icon>}
        {children}
      </button>
    );
  }
);

export default Button;
