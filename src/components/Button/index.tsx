import React, { CSSProperties, ButtonHTMLAttributes, forwardRef } from 'react';
import cls from 'classnames';
import './style.scss';
import Icon, { IconNames } from 'components/Icon';
import icons from 'components/Icon/icons';
import Loading from 'components/Loading';
import Spin from 'components/Loading/Spin';

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
  loading?: boolean;
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
      type = 'button',
      loading = false,
      ...props
    },
    ref
  ) => {
    const iconOnly = icon && !children;

    const SVGIcon = icon ? icons[icon] : undefined;

    return (
      <button
        tabIndex={0}
        type={type}
        {...props}
        ref={ref}
        className={cls(
          'lanting-button',
          `lanting-button-${variant}`,
          `lanting-button-${variant}--${color}`,
          {
            'lanting-button--disabled': disabled || loading,
            'lanting-button-icononly': iconOnly,
            'lanting-button--active': active,
            'lanting-button--wide': wide,
            'lanting-button-hasicon': icon && children,
          },
          className
        )}
        style={style}
        disabled={disabled || loading}
      >
        <div
          style={{
            visibility: loading ? 'hidden' : 'visible',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {SVGIcon && (
            <div className='lanting-button-icon'>
              <SVGIcon fill='currentColor' width={20} height={20} />
            </div>
          )}
          {children}
        </div>
        {loading && <Spin size={24} />}
      </button>
    );
  }
);

export default Button;
