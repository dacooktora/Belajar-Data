import { cn } from '@/lib/utils/helpers';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'white' | 'gray' | 'green' | 'red' | 'purple';
  label?: string;
  className?: string;
}

export function Spinner({
  size = 'md',
  color = 'blue',
  label,
  className,
}: SpinnerProps) {
  const sizeClasses = {
    xs: 'w-3 h-3 border-[2px]',
    sm: 'w-4 h-4 border-[2px]',
    md: 'w-6 h-6 border-[3px]',
    lg: 'w-8 h-8 border-[4px]',
    xl: 'w-12 h-12 border-[4px]',
  };

  const colorClasses = {
    blue: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
    green: 'border-green-500 border-t-transparent',
    red: 'border-red-500 border-t-transparent',
    purple: 'border-purple-500 border-t-transparent',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'rounded-full animate-spin',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && (
        <span className="text-sm text-gray-500">{label}</span>
      )}
    </div>
  );
}

export default Spinner;
