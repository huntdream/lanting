import React, { CSSProperties, HTMLAttributes, useEffect, useRef } from 'react';
import cls from 'classnames';
import './style.scss';
import useHover from 'hooks/useHover';
import useDynamicSVGImport from 'hooks/useDynamicSVGImport';

interface IconProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  size?: number;
  style?: CSSProperties;
  clickable?: boolean;
  round?: boolean;
  name: string;
}

const Icon: React.FC<IconProps> = ({
  className,
  style,
  size,
  round,
  name,
  clickable,
  onClick,
  ...props
}) => {
  const [ref, overlay] = useHover();
  const [SVGIcon] = useDynamicSVGImport(name);

  return (
    <i
      ref={ref}
      className={cls(
        'lanting-icon',
        'material-icons',
        onClick || clickable ? 'lanting-icon--clickable' : undefined,
        className,
        {
          'lanting-icon-round': round,
        }
      )}
      onClick={onClick}
      style={{ fontSize: size, ...style }}
      {...props}
    >
      {SVGIcon && <SVGIcon width={24} height={24} fill='currentColor' />}
      {overlay}
    </i>
  );
};

export default Icon;
