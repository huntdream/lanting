import React, { ChangeEvent, ChangeEventHandler, FC } from 'react';
import './style.scss';

interface IOption {
  label: string;
  value: any;
}

interface Props {
  options?: IOption[];
  value?: any;
  onChange?: (value: any, e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<Props> = ({ value, options = [], onChange }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (onChange) {
      onChange(event.target.value, event);
    }
  };

  return (
    <select className='lanting-select' value={value} onChange={handleChange}>
      {options?.map(({ label, value }) => (
        <option value={value} title={label} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
