import { cn } from '@/lib/utils/helpers';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'outline';
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
  size = 'md',
  variant = 'default',
  className,
  labelClassName,
  descriptionClassName,
}: SwitchProps) {
  const sizeClasses = {
    sm: {
      track: 'w-8 h-5',
      thumb: 'w-3 h-3',
      thumbTranslate: 'translate-x-3',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-4 h-4',
      thumbTranslate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-5 h-5',
      thumbTranslate: 'translate-x-7',
    },
  };

  const variantClasses = {
    default: {
      checked: 'bg-blue-600',
      unchecked: 'bg-gray-300',
    },
    gradient: {
      checked: 'bg-gradient-to-r from-blue-500 to-purple-500',
      unchecked: 'bg-gray-300',
    },
    outline: {
      checked: 'bg-blue-600 border-2 border-blue-600',
      unchecked: 'bg-white border-2 border-gray-300',
    },
  };

  const handleClick = () => {
    if (disabled) return;
    onCheckedChange(!checked);
  };

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'relative inline-flex flex-shrink-0 rounded-full transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant][checked ? 'checked' : 'unchecked'],
          sizeClasses[size].track
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out',
            sizeClasses[size].thumb,
            checked && sizeClasses[size].thumbTranslate
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'opacity-50 cursor-not-allowed',
              labelClassName
            )}>
              {label}
            </span>
          )}
          {description && (
            <span className={cn(
              'text-sm text-gray-500',
              disabled && 'opacity-50 cursor-not-allowed',
              descriptionClassName
            )}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Switch;
