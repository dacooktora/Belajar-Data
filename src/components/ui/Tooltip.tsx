import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/helpers';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
  contentClassName,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
  };

  const show = () => {
    if (disabled) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        break;
      case 'top-left':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left;
        break;
      case 'top-right':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.right - tooltipRect.width;
        break;
      case 'bottom-left':
        top = triggerRect.bottom + 8;
        left = triggerRect.left;
        break;
      case 'bottom-right':
        top = triggerRect.bottom + 8;
        left = triggerRect.right - tooltipRect.width;
        break;
    }

    // Keep tooltip in viewport
    const padding = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < padding) left = padding;
    if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > viewportHeight - padding) {
      top = viewportHeight - tooltipRect.height - padding;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className={cn('inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && !disabled && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-150',
            contentClassName
          )}
          style={{
            top: coords.top,
            left: coords.left,
            maxWidth: '280px',
          }}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute w-2 h-2 bg-gray-900 rotate-45',
              position === 'top' && 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
              position === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
              position === 'left' && 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2',
              position === 'right' && 'right-full top-1/2 -translate-y-1/2 translate-x-1/2',
              position === 'top-left' && 'top-full left-4 -translate-y-1/2',
              position === 'top-right' && 'top-full right-4 -translate-y-1/2',
              position === 'bottom-left' && 'bottom-full left-4 translate-y-1/2',
              position === 'bottom-right' && 'bottom-full right-4 translate-y-1/2',
            )}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

export default Tooltip;
