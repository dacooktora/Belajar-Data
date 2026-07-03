import { TextareaHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  description?: string;
  variant?: 'default' | 'outline' | 'filled' | 'flushed';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      description,
      variant = 'default',
      size = 'md',
      fullWidth = true,
      rows = 4,
      resize = 'vertical',
      showCount = false,
      maxLength,
      id,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    const variants = {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      outline: 'border-2 border-gray-300 focus:border-blue-500 focus:ring-0',
      filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
      flushed: 'border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-5 py-3.5 text-base',
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1.5',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            value={value}
            className={cn(
              'w-full rounded-lg transition-colors duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'placeholder:text-gray-400',
              'focus:outline-none',
              variants[variant],
              sizes[size],
              resizeClasses[resize],
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        </div>
        {description && !error && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        {showCount && maxLength && (
          <div className="mt-1 flex justify-end">
            <span className={cn(
              'text-xs',
              currentLength > maxLength * 0.9 ? 'text-yellow-600' : 'text-gray-400'
            )}>
              {currentLength} / {maxLength}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
