import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pill' | 'box' | 'button';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'underline',
  size = 'md',
  className,
  tabClassName,
  contentClassName,
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || ''
  );

  const activeTab = controlledActiveTab !== undefined 
    ? controlledActiveTab 
    : internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const variantClasses = {
    underline: {
      container: 'border-b border-gray-200',
      tab: (isActive: boolean, disabled: boolean) => cn(
        'border-b-2 -mb-px px-4 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      ),
    },
    pill: {
      container: 'flex gap-1 p-1 bg-gray-100 rounded-xl',
      tab: (isActive: boolean, disabled: boolean) => cn(
        'px-4 py-2 text-sm font-medium rounded-lg transition-all',
        isActive
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      ),
    },
    box: {
      container: 'flex gap-1',
      tab: (isActive: boolean, disabled: boolean) => cn(
        'px-4 py-2.5 text-sm font-medium border rounded-lg transition-all',
        isActive
          ? 'border-blue-600 bg-blue-50 text-blue-600'
          : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      ),
    },
    button: {
      container: 'flex gap-2',
      tab: (isActive: boolean, disabled: boolean) => cn(
        'px-4 py-2 text-sm font-medium rounded-lg transition-all',
        isActive
          ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      ),
    },
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const currentVariant = variantClasses[variant];

  return (
    <div className={className}>
      <div className={cn('flex flex-wrap', currentVariant.container)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                currentVariant.tab(isActive, !!tab.disabled),
                sizeClasses[size],
                tabClassName
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className={cn('mt-4', contentClassName)}
        role="tabpanel"
        id={`tab-panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeContent}
      </div>
    </div>
  );
}

export default Tabs;
