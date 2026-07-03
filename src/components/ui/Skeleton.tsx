import { cn } from '@/lib/utils/helpers';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect' | 'card' | 'avatar' | 'button' | 'image';
  width?: string | number;
  height?: string | number;
  count?: number;
  animated?: boolean;
}

export function Skeleton({
  className,
  variant = 'rect',
  width,
  height,
  count = 1,
  animated = true,
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full aspect-square',
    rect: 'rounded-lg',
    card: 'rounded-xl',
    avatar: 'rounded-full aspect-square',
    button: 'rounded-lg',
    image: 'rounded-lg aspect-[16/9]',
  };

  const SkeletonItem = () => (
    <div
      className={cn(
        'bg-gray-200',
        animated && 'relative overflow-hidden',
        variants[variant],
        className
      )}
      style={{
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'text' ? undefined : undefined),
        ...(variant === 'text' && !height && { height: '1rem' }),
        ...(variant === 'avatar' && !width && !height && { width: '3rem', height: '3rem' }),
        ...(variant === 'button' && !width && !height && { width: '8rem', height: '2.5rem' }),
        ...(variant === 'card' && !width && !height && { width: '100%', height: '12rem' }),
        ...(variant === 'image' && !width && !height && { width: '100%' }),
      }}
      {...props}
    >
      {animated && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </div>
  );

  if (count > 1) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    );
  }

  return <SkeletonItem />;
}

export default Skeleton;
