import React from 'react';

export interface TitleProps {
  children: string;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <title>{children}</title>;
};

export default Title;
