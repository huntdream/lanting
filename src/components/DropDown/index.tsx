import Icon from 'components/Icon';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './style.scss';

interface Props {
  label: string;
  icon: string;
  children: ReactNode;
}

const DropDown: React.FC<Props> = ({ label, icon, children }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const button = buttonRef.current;

    if (button && dropDown) {
      const { left, top, height } = button.getBoundingClientRect();

      dropDown.style.top = `${top + height}px`;
      dropDown.style.left = `${Math.min(
        left,
        window.innerWidth - dropDown.offsetWidth - 20
      )}px`;
    }
  }, [showDropDown, dropDownRef, buttonRef]);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!button.contains(target)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  const handleClick = () => {
    setShowDropDown(true);
  };

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleClick}
        className='lanting-dropdown-label'
      >
        <Icon>{icon}</Icon>
        <span className='lanting-dropdown-label-text'>{label}</span>
        <Icon>expand_more</Icon>
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
