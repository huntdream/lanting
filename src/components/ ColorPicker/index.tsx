import React from 'react';
import './style.scss';
import DropDown from 'components/DropDown';
import Input from 'components/Input';
import Picker from './Picker';

interface Props {}

const ColorPicker: React.FC<Props> = () => {
  return (
    <DropDown icon='format_color_text'>
      <Picker />
    </DropDown>
  );
};

export default ColorPicker;
