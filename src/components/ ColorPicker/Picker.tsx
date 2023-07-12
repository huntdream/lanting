import React, { useState } from 'react';
import './style.scss';
import Input from 'components/Input';
import Slider from './Slider';

interface Props {}

const Picker: React.FC<Props> = () => {
  const [color, setColor] = useState('#fff');

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <div className='lanting-color-picker'>
      <div className='lanting-color-picker-basic-color'></div>
      <div
        className='lanting-color-picker-saturation'
        style={{ backgroundColor: 'rgba(255,0,0)' }}
      ></div>
      <Slider className='lanting-color-picker-hue' />
      <Slider className='lanting-color-picker-alpha' />
      <div className='lanting-color-picker-input'>
        <div>HEX</div>
        <Input
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Picker;
