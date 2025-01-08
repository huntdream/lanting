import React, { ReactNode } from 'react';
import Text from 'components/Text';
import cls from 'classnames';
import './style.scss';

interface Props {
  label?: string;
  name?: string;
  message?: string;
  children?: ReactNode;
  layout?: 'horizontal' | 'vertical';
}

const FormItem: React.FC<Props> = ({
  children,
  name,
  label,
  layout,
  message,
}) => {
  return (
    <div
      className={cls('lanting-formitem', {
        'lanting-formitem--error': message,
        'lanting-formitem--horizontal': layout === 'horizontal',
      })}
    >
      <label htmlFor={name} className='label'>
        {label}
      </label>
      <div className='wrapper'>
        <div className='formitem'>{children}</div>
        <Text.Error className='message'>{message}</Text.Error>
      </div>
    </div>
  );
};

export default FormItem;
