'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/helpers';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';

export interface MobileNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href: string;
  badge?: string | number;
  onClick?: () => void;
}

export interface MobileNavProps {
  items: MobileNavItem[];
  variant?: 'default' | 'dark' | 'gradient' | 'glass';
  position?: 'bottom' | 'top';
  className?: string;
  showLabels?: boolean;
  showBadge?: boolean;
}

export function MobileNav({
  items,
  variant = 'default',
  position = 'bottom',
  className,
  showLabels = true,
  showBadge = true,
}: MobileNavProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const variantClasses = {
    default: 'bg-white border-t border-gray-200',
    dark: 'bg-gray-900 text-white border-t border-gray-800',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    glass: 'bg-white/80 backdrop-blur-md border-t border-white/20',
  };

  const positionClasses = {
    bottom: 'fixed bottom-0 left-0 right-0 z-40',
    top: 'fixed top-0 left-0 right-0 z-40',
  };

  const textColorClasses = {
    default: 'text-gray-500',
    dark: 'text-gray-400',
    gradient: 'text-white/70',
    glass: 'text-gray-500',
  };

  const activeColorClasses = {
    default: 'text-blue-600',
    dark: 'text-white',
    gradient: 'text-white',
    glass: 'text-blue-600',
  };

  return (
    <nav
      className={cn(
        'lg:hidden',
        positionClasses[position],
        variantClasses[variant],
        'transition-transform duration-300',
        !isVisible && position === 'bottom' && 'translate-y-full',
        !isVisible && position === 'top' && '-translate-y-full',
        className
      )}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-4 py-1.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

          return (
            <Tooltip
              key={item.id}
              content={item.label}
              position="top"
              disabled={!showLabels}
            >
              <Link
                href={item.href}
                onClick={item.onClick}
                className={cn(
                  'flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-colors relative',
                  'min-w-[56px]',
                  isActive
                    ? activeColorClasses[variant]
                    : textColorClasses[variant]
                )}
              >
                <span className="text-xl">{Icon}</span>
                {showLabels && (
                  <span className={cn(
                    'text-[10px] font-medium mt-0.5 transition-colors',
                    isActive
                      ? activeColorClasses[variant]
                      : textColorClasses[variant]
                  )}>
                    {item.label}
                  </span>
                )}
                {showBadge && item.badge && (
                  <Badge
                    variant="danger"
                    size="xs"
                    className="absolute -top-0.5 right-0 min-w-[18px] h-[18px] flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </Tooltip>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
