import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import './style.scss';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabProps> = ({ tabs = [], activeTab, onTabChange }) => {
  const [hlStyles, setHLStyles] = useState<React.CSSProperties>({});
  const hlRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(tabs[0]?.id);

  useEffect(() => {
    setActive(activeTab || tabs[0]?.id);
  }, [activeTab, tabs]);

  const handleTabChange = (tabId: string) => {
    setActive(tabId);

    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const parentLeft =
      e.currentTarget.parentElement?.getBoundingClientRect().left || 0;
    const offset = left - parentLeft;

    setHLStyles({
      width,
      opacity: 1,
      transform: `translateX(${offset}px)`,
    });
  };

  const handleMouseLeave = () => {
    setHLStyles({ ...hlStyles, opacity: 0 });
  };

  return (
    <div className='tabs'>
      <div className='tabs-header'>
        <div className='tabs-list' onMouseLeave={handleMouseLeave}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tabs-label ${tab.id === active ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              onMouseEnter={handleMouseEnter}
            >
              {tab.label}
            </div>
          ))}
          <div className='tabs-highlight' style={hlStyles} ref={hlRef} />
        </div>
      </div>
      <div className='tabs-content'>
        {tabs.find((tab) => tab.id === active)?.content}
      </div>
    </div>
  );
};

export default Tabs;
