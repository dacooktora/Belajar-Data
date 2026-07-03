'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/helpers';
import { Tooltip } from '@/components/ui/Tooltip';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
  badge?: string | number;
  badgeColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  children?: SidebarItem[];
  isCollapsible?: boolean;
}

export interface SidebarSection {
  id: string;
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  variant?: 'default' | 'dark' | 'gradient' | 'glass';
  position?: 'fixed' | 'sticky' | 'static';
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    level: number;
    xp: number;
    nextLevelXp: number;
  };
  showUserProfile?: boolean;
  showProgress?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  footer?: React.ReactNode;
}

export function Sidebar({
  sections,
  variant = 'default',
  position = 'fixed',
  isCollapsed: controlledCollapsed,
  onCollapse,
  className,
  user,
  showUserProfile = true,
  showProgress = true,
  showSearch = false,
  onSearch,
  footer,
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(controlledCollapsed || false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const variantClasses = {
    default: 'bg-white border-r border-gray-200',
    dark: 'bg-gray-900 text-white border-r border-gray-800',
    gradient: 'bg-gradient-to-b from-blue-600 to-purple-600 text-white',
    glass: 'bg-white/80 backdrop-blur-md border-r border-white/20',
  };

  const positionClasses = {
    fixed: 'fixed top-0 left-0 h-full z-40',
    sticky: 'sticky top-0 h-screen',
    static: 'relative h-full',
  };

  const widthClasses = {
    expanded: 'w-64',
    collapsed: 'w-16',
  };

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse?.(newState);
  };

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const isItemActive = (item: SidebarItem) => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some(child => child.href === pathname);
    }
    return false;
  };

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (!searchQuery) return true;
      const matchesLabel = item.label.toLowerCase().includes(searchQuery.toLowerCase());
      if (item.children) {
        const matchesChildren = item.children.some(child =>
          child.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesLabel || matchesChildren;
      }
      return matchesLabel;
    }),
  })).filter(section => section.items.length > 0);

  return (
    <aside
      className={cn(
        'flex flex-col transition-all duration-300',
        positionClasses[position],
        variantClasses[variant],
        widthClasses[isCollapsed ? 'collapsed' : 'expanded'],
        className
      )}
      role="navigation"
      aria-label="Sidebar"
    >
      {/* Collapse Toggle */}
      <button
        onClick={handleCollapse}
        className={cn(
          'absolute -right-3 top-6 z-10 p-1 rounded-full border shadow-md bg-white hover:bg-gray-50 transition-transform',
          isCollapsed && 'rotate-180'
        )}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>

      {/* User Profile */}
      {showUserProfile && user && !isCollapsed && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar src={user.avatar} name={user.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </div>
            </div>
          </div>
          {showProgress && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                <span>Level {user.level}</span>
                <span>{user.xp} / {user.nextLevelXp} XP</span>
              </div>
              <ProgressBar
                value={user.xp}
                max={user.nextLevelXp}
                size="sm"
                color="gradient"
                showPercentage={false}
              />
            </div>
          )}
        </div>
      )}

      {/* Search */}
      {showSearch && (
        <div className={cn('p-4', isCollapsed && 'px-2')}>
          <div className="relative">
            <input
              type="text"
              placeholder={isCollapsed ? '' : 'Cari...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className={cn(
                'w-full px-3 py-1.5 rounded-lg text-sm transition-all',
                'bg-gray-100 border border-transparent',
                'focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none',
                isCollapsed ? 'pl-2 text-center' : 'pl-9',
                variant === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' : 'text-gray-700 placeholder-gray-400'
              )}
            />
            {!isCollapsed && (
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {filteredSections.map((section) => (
          <div key={section.id} className="mb-4">
            {section.title && !isCollapsed && (
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = isItemActive(item);
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems.has(item.id);

                return (
                  <div key={item.id}>
                    {hasChildren ? (
                      <div>
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                            'hover:bg-gray-100 dark:hover:bg-gray-800',
                            isActive && 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                            isCollapsed && 'justify-center'
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              <svg
                                className={cn(
                                  'w-4 h-4 transition-transform',
                                  isExpanded && 'rotate-180'
                                )}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                          {item.badge && !isCollapsed && (
                            <Badge
                              variant={item.badgeColor || 'primary'}
                              size="sm"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                        {isExpanded && !isCollapsed && (
                          <div className="ml-6 mt-0.5 space-y-0.5">
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.id}
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-all',
                                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                                    isChildActive
                                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                      : 'text-gray-600 dark:text-gray-300'
                                  )}
                                >
                                  <span className="flex-shrink-0">{child.icon}</span>
                                  <span>{child.label}</span>
                                  {child.badge && (
                                    <Badge
                                      variant={child.badgeColor || 'primary'}
                                      size="xs"
                                      className="ml-auto"
                                    >
                                      {child.badge}
                                    </Badge>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Tooltip
                        content={isCollapsed ? item.label : ''}
                        position="right"
                        disabled={!isCollapsed}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                            'hover:bg-gray-100 dark:hover:bg-gray-800',
                            isActive
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-300',
                            isCollapsed && 'justify-center'
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              {item.badge && (
                                <Badge
                                  variant={item.badgeColor || 'primary'}
                                  size="sm"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </Link>
                      </Tooltip>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className={cn(
          'border-t border-gray-200 dark:border-gray-700 p-4',
          isCollapsed && 'p-2'
        )}>
          {footer}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
