import React, { forwardRef, InputHTMLAttributes } from 'react';
import cls from 'classnames';
import './style.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  borderless?: boolean;
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, borderless, ...props }, ref) => {
    const classNames = cls(
      'lanting-input',
      {
        'lanting-input--borderless': borderless,
      },
      className
    );

    return <input ref={ref} className={classNames} {...props} />;
  }
);

export default Input;
