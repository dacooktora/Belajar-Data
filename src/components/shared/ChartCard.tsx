'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  height?: number;
  actions?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  }[];
  badges?: {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  }[];
  className?: string;
  noPadding?: boolean;
}

export function ChartCard({
  title,
  description,
  children,
  height = 300,
  actions = [],
  badges = [],
  className,
  noPadding = false,
}: ChartCardProps) {
  return (
    <Card
      variant="default"
      padding={noPadding ? 'none' : 'md'}
      className={cn('', className)}
    >
      <div className={cn('flex items-center justify-between', !noPadding && 'mb-4')}>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant={badge.variant || 'secondary'}
              size="sm"
            >
              {badge.label}
            </Badge>
          ))}
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={cn(
          'w-full',
          noPadding ? '' : 'rounded-lg overflow-hidden'
        )}
        style={{ height }}
      >
        {children}
      </div>
    </Card>
  );
}

export default ChartCard;
