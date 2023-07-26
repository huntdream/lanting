import React, { CSSProperties, HTMLAttributes, useEffect, useRef } from 'react';
import cls from 'classnames';
import './style.scss';
import useHover from 'hooks/useHover';
import icons from './icons';

export type IconNames = keyof typeof icons;

interface IconProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  size?: number;
  style?: CSSProperties;
  clickable?: boolean;
  round?: boolean;
  name: IconNames;
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
  const SVGIcon = icons[name];

  const showOverlay = onClick || clickable;

  return (
    <i
      ref={showOverlay ? ref : undefined}
      className={cls(
        'lanting-icon',
        showOverlay ? 'lanting-icon--clickable' : undefined,
        className,
        {
          'lanting-icon-round': round,
        }
      )}
      onClick={onClick}
      style={{ fontSize: size, ...style }}
      {...props}
    >
      {SVGIcon && <SVGIcon width={size} height={size} fill='currentColor' />}
      {showOverlay && overlay}
    </i>
  );
};

export default Icon;
