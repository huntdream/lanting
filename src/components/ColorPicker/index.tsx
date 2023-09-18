import React, { useState } from 'react';
import './style.scss';
import DropDown from 'components/DropDown';
import Input from 'components/Input';
import Picker from './Picker';
import Icon from 'components/Icon';

interface Props {}

const ColorPicker: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  return (
    <DropDown
      visible={visible}
      onVisibleChange={setVisible}
      label={<Icon name='format_color_fill' />}
    >
      <Picker />
    </DropDown>
  );
};

export default ColorPicker;
