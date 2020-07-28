import React, { forwardRef, InputHTMLAttributes } from 'react';
import cls from 'classnames';
import './style.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input ref={ref} className={cls('lanting-input', className)} {...props} />
    );
  }
);

export default Input;
