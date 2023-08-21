import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './style.scss';

interface Props {
  label?: ReactNode;
  children: ReactNode;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const DropDown: React.FC<Props> = ({
  label,
  children,
  visible = false,
  onVisibleChange,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const button = buttonRef.current;

    if (button && dropDown) {
      const {
        left,
        top,
        height,
        right,
        width: buttonWidth,
        bottom,
      } = button.getBoundingClientRect();
      const { width: dropDownWidth, height: dropDownHeight } =
        dropDown.getBoundingClientRect();

      let x = right - dropDownWidth;

      if (left + buttonWidth < dropDownWidth) {
        x = left;
      }

      let y = top + height;

      if (window.innerHeight - bottom < dropDownHeight) {
        y = top - height - dropDownHeight;
      }

      dropDown.style.top = `${y}px`;
      dropDown.style.left = `${x}px`;
    }
  }, [showDropDown, dropDownRef, buttonRef]);

  useEffect(() => {
    setShowDropDown(visible);
  }, [visible]);

  useEffect(() => {
    const button = buttonRef.current;
    const dropdown = dropDownRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!button.contains(target) && !dropdown?.contains(target)) {
          handleVisibleChange(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  const handleVisibleChange = (v: boolean) => {
    setShowDropDown(v);
    if (onVisibleChange) {
      onVisibleChange(v);
    }
  };

  const handleClick = () => {
    handleVisibleChange(true);
  };

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleClick}
        className='lanting-dropdown-label'
      >
        {label}
      </div>

      {showDropDown &&
        createPortal(
          <div className='lanting-dropdown' ref={dropDownRef}>
            {children}
          </div>,
          document.body
        )}
    </>
  );
};

export default DropDown;
