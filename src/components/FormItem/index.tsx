import React, { ReactNode } from 'react';
import Text from 'components/Text';
import cls from 'classnames';
import './style.scss';

interface Props {
  label?: string;
  name?: string;
  message?: string;
  children?: ReactNode;
}

const FormItem: React.FC<Props> = ({ children, name, label, message }) => {
  return (
    <div
      className={cls('lanting-formitem', {
        'lanting-formitem--error': message,
      })}
    >
      <label htmlFor={name} className='lanting-formitem-label'>
        {label}
      </label>
      <div className='lanting-formitem-child'>{children}</div>
      <Text.Error>{message}</Text.Error>
    </div>
  );
};

export default FormItem;
