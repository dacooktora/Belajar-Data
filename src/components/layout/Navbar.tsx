'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import { Switch } from '@/components/ui/Switch';
import { NAVIGATION_LINKS } from '@/lib/utils/constants';

export interface NavbarProps {
  variant?: 'default' | 'glass' | 'dark' | 'gradient' | 'transparent';
  position?: 'fixed' | 'sticky' | 'static' | 'absolute';
  showLogo?: boolean;
  showSearch?: boolean;
  showUserMenu?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showProgress?: boolean;
  progressValue?: number;
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    level?: number;
    xp?: number;
  };
  notifications?: {
    id: string;
    title: string;
    description: string;
    type: 'info' | 'warning' | 'success' | 'error';
    isRead: boolean;
    createdAt: string;
  }[];
  onThemeToggle?: (isDark: boolean) => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: (id: string) => void;
  onLogout?: () => void;
}

export function Navbar({
  variant = 'default',
  position = 'sticky',
  showLogo = true,
  showSearch = true,
  showUserMenu = true,
  showNotifications = true,
  showThemeToggle = true,
  showProgress = false,
  progressValue = 0,
  className,
  user,
  notifications = [],
  onThemeToggle,
  onSearch,
  onNotificationClick,
  onLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const variantClasses = {
    default: 'bg-white border-b border-gray-200',
    glass: 'bg-white/80 backdrop-blur-md border-b border-white/20',
    dark: 'bg-gray-900 text-white border-b border-gray-800',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    transparent: 'bg-transparent border-b border-transparent',
  };

  const positionClasses = {
    fixed: 'fixed top-0 left-0 right-0 z-50',
    sticky: 'sticky top-0 z-50',
    static: 'relative',
    absolute: 'absolute top-0 left-0 right-0 z-50',
  };

  const textColorClasses = {
    default: 'text-gray-700',
    glass: 'text-gray-700',
    dark: 'text-white',
    gradient: 'text-white',
    transparent: 'text-white',
  };

  const linkColorClasses = {
    default: 'text-gray-600 hover:text-gray-900',
    glass: 'text-gray-600 hover:text-gray-900',
    dark: 'text-gray-300 hover:text-white',
    gradient: 'text-white/80 hover:text-white',
    transparent: 'text-white/80 hover:text-white',
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle('dark', checked);
    onThemeToggle?.(checked);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current) {
      onSearch?.(searchRef.current.value);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '📌';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-blue-500';
      case 'warning': return 'border-yellow-500';
      case 'success': return 'border-green-500';
      case 'error': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <nav
      className={cn(
        'transition-all duration-300',
        positionClasses[position],
        variantClasses[variant],
        position === 'fixed' && isScrolled && 'shadow-lg',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-4">
            {showLogo && (
              <Link
                href="/"
                className="flex items-center gap-2 group"
                aria-label="Home"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg transition-transform group-hover:scale-105">
                  DA
                </div>
                <span className={cn(
                  'text-xl font-bold transition-colors hidden sm:block',
                  variant === 'dark' ? 'text-white' : 'text-gray-800'
                )}>
                  Data<span className="text-blue-500">Analyst</span>
                </span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : linkColorClasses[variant],
                    variant === 'gradient' || variant === 'transparent'
                      ? 'hover:bg-white/10'
                      : ''
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {showSearch && (
              <div className="relative hidden md:block">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Cari materi..."
                    className={cn(
                      'w-48 lg:w-64 px-3 py-1.5 pl-9 rounded-lg text-sm transition-all duration-200',
                      'bg-gray-100 border border-transparent',
                      'focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none',
                      variant === 'dark'
                        ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                        : 'text-gray-700 placeholder-gray-400'
                    )}
                  />
                  <svg
                    className="absolute left-3 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </form>
              </div>
            )}

            {/* Theme Toggle */}
            {showThemeToggle && (
              <Tooltip content={isDark ? 'Mode Terang' : 'Mode Gelap'}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleThemeToggle(!isDark)}
                  className="rounded-full"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </Button>
              </Tooltip>
            )}

            {/* Notifications */}
            {showNotifications && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="rounded-full relative"
                  aria-label="Notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadNotifications > 0 && (
                    <Badge
                      variant="danger"
                      size="xs"
                      className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center"
                    >
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </Badge>
                  )}
                </Button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-2 max-h-[400px] overflow-y-auto z-50">
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Notifikasi</span>
                      {unreadNotifications > 0 && (
                        <button
                          className="text-xs text-blue-600 hover:text-blue-700"
                          onClick={() => {
                            notifications.forEach(n => onNotificationClick?.(n.id));
                          }}
                        >
                          Tandai semua dibaca
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <span className="text-2xl block mb-2">🔔</span>
                        Tidak ada notifikasi
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => {
                            onNotificationClick?.(notification.id);
                            setIsNotificationsOpen(false);
                          }}
                          className={cn(
                            'w-full px-4 py-3 text-left transition-colors hover:bg-gray-50',
                            'flex items-start gap-3 border-l-4',
                            getNotificationColor(notification.type),
                            !notification.isRead && 'bg-blue-50/50'
                          )}
                        >
                          <span className="text-lg flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </span>
                              {!notification.isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                              {notification.description}
                            </p>
                            <span className="text-xs text-gray-400 mt-1 block">
                              {new Date(notification.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <Link
                        href="/notifications"
                        className="block text-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        Lihat semua notifikasi
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}
            {showUserMenu && user && (
              <Dropdown
                trigger={
                  <button
                    className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none"
                    aria-label="User menu"
                  >
                    <Avatar
                      src={user.avatar}
                      name={user.name}
                      size="sm"
                      status="online"
                    />
                    <div className="hidden sm:block text-left">
                      <div className={cn(
                        'text-sm font-medium',
                        variant === 'dark' || variant === 'gradient' || variant === 'transparent'
                          ? 'text-white'
                          : 'text-gray-700'
                      )}>
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-400">{user.role || 'Student'}</div>
                    </div>
                    <svg
                      className={cn(
                        'w-4 h-4 hidden sm:block',
                        variant === 'dark' || variant === 'gradient' || variant === 'transparent'
                          ? 'text-white/70'
                          : 'text-gray-400'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                }
                items={[
                  {
                    label: (
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatar} name={user.name} size="sm" />
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    ),
                    value: 'profile',
                  },
                  { divider: true },
                  {
                    label: (
                      <div className="flex items-center gap-2">
                        <span>🏆</span>
                        <span>Level {user.level || 1}</span>
                        <span className="text-xs text-gray-400">({user.xp || 0} XP)</span>
                      </div>
                    ),
                    value: 'level',
                  },
                  { divider: true },
                  {
                    label: '📊 Dashboard',
                    value: 'dashboard',
                    icon: <span>📊</span>,
                    onClick: () => window.location.href = '/dashboard',
                  },
                  {
                    label: '📚 My Learning',
                    value: 'learning',
                    icon: <span>📚</span>,
                    onClick: () => window.location.href = '/learning',
                  },
                  {
                    label: '🏅 Achievements',
                    value: 'achievements',
                    icon: <span>🏅</span>,
                    onClick: () => window.location.href = '/achievements',
                  },
                  {
                    label: '⚙️ Settings',
                    value: 'settings',
                    icon: <span>⚙️</span>,
                    onClick: () => window.location.href = '/settings',
                  },
                  { divider: true },
                  {
                    label: '📝 Feedback',
                    value: 'feedback',
                    icon: <span>📝</span>,
                    onClick: () => window.location.href = '/feedback',
                  },
                  {
                    label: '❓ Help & Support',
                    value: 'help',
                    icon: <span>❓</span>,
                    onClick: () => window.location.href = '/help',
                  },
                  { divider: true },
                  {
                    label: '🚪 Logout',
                    value: 'logout',
                    icon: <span>🚪</span>,
                    danger: true,
                    onClick: onLogout,
                  },
                ]}
                position="bottom-right"
                align="end"
              />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500">Progress</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressValue, 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700">
                {Math.round(Math.min(progressValue, 100))}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg py-2 animate-in slide-in-from-top-5 duration-200"
        >
          <div className="px-4">
            {showSearch && (
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Cari materi..."
                    className="w-full px-3 py-2 pl-9 rounded-lg text-sm bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>
            )}
            <div className="flex flex-col gap-1">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            {showThemeToggle && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-600">Mode Gelap</span>
                <Switch
                  checked={isDark}
                  onCheckedChange={handleThemeToggle}
                  size="sm"
                />
              </div>
            )}
            {showUserMenu && user && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={onLogout}
                >
                  🚪 Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
