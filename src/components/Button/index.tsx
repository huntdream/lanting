import React, { CSSProperties, ButtonHTMLAttributes, forwardRef } from 'react';
import cls from 'classnames';
import './style.scss';
import Icon, { IconNames } from 'components/Icon';
import icons from 'components/Icon/icons';

type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  color?: ButtonColor;
  icon?: IconNames;
  variant?: 'contained' | 'text';
  wide?: boolean;
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
      wide,
      ...props
    },
    ref
  ) => {
    const iconOnly = icon && !children;

    const SVGIcon = icon ? icons[icon] : undefined;

    return (
      <button
        tabIndex={0}
        {...props}
        ref={ref}
        className={cls(
          'lanting-button',
          `lanting-button-${variant}`,
          `lanting-button-${variant}--${color}`,
          {
            'lanting-button--disabled': disabled,
            'lanting-button-icononly': iconOnly,
            'lanting-button--active': active,
            'lanting-button--wide': wide,
            'lanting-button-hasicon': icon && children,
          },
          className
        )}
        style={style}
        disabled={disabled}
      >
        {SVGIcon && (
          <div className='lanting-button-icon'>
            <SVGIcon fill='currentColor' width={20} height={20} />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
