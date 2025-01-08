import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import cls from 'classnames';
import './style.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  borderless?: boolean;
}

const Textarea: React.FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, borderless, ...props }, ref) => {
  const classNames = cls(
    'lanting-textarea',
    {
      'lanting-textarea--borderless': borderless,
    },
    className
  );

  return <textarea ref={ref} className={classNames} {...props} />;
});

export default Textarea;
