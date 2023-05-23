import React, { useState, useEffect, useRef, MouseEvent, useMemo } from 'react';
import cls from 'classnames';
import './style.scss';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  tabs: Tab[];
  sticky?: boolean;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabProps> = ({
  tabs = [],
  sticky,
  activeTab,
  onTabChange,
}) => {
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

  const content = useMemo(
    () => tabs.find((tab) => tab.id === active)?.content,
    [active, tabs]
  );

  return (
    <div
      className={cls('tabs', {
        'tabs--sticky': sticky,
      })}
    >
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
      {content ? <div className='tabs-content'>{content}</div> : null}
    </div>
  );
};

export default Tabs;
