import React, { FC } from 'react';
import cls from 'classnames';
import './style.scss';

interface Props {
  type: string;
}

const Icon: FC<Props> = ({ type }) => {
  return <i className={cls('lanting-editor-icon', type)}></i>;
};

export default Icon;
