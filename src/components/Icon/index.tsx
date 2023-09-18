import React, {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  TouchEvent,
} from 'react';
import cls from 'classnames';
import './style.scss';
import useHover from 'hooks/useHover';
import icons from './icons';

export type IconNames = keyof typeof icons;

interface IconProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  size?: number | string;
  style?: CSSProperties;
  clickable?: boolean;
  round?: boolean;
  name: IconNames;
}

const Icon: React.FC<IconProps> = ({
  className,
  style,
  size = 24,
  round,
  name,
  clickable,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  ...props
}) => {
  const [hoverEvents, overlay] = useHover();
  const SVGIcon = icons[name];

  const showOverlay = onClick || clickable;

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    hoverEvents.onMouseEnter(e);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    hoverEvents.onMouseLeave(e);
    onMouseLeave?.(e);
  };

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    hoverEvents.onTouchStart(e);
    onTouchStart?.(e);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    hoverEvents.onTouchEnd(e);
    onTouchEnd?.(e);
  };

  return (
    <i
      className={cls(
        'lanting-icon',
        showOverlay ? 'lanting-icon--clickable' : undefined,
        className,
        {
          'lanting-icon-round': round,
        }
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      {SVGIcon && <SVGIcon width={size} height={size} fill='currentColor' />}
      {showOverlay && overlay}
    </i>
  );
};

export default Icon;
