'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface NotificationCardProps {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
  compact?: boolean;
}

export function NotificationCard({
  id,
  type,
  title,
  description,
  isRead,
  createdAt,
  actions = [],
  onMarkAsRead,
  onDismiss,
  className,
  compact = false,
}: NotificationCardProps) {
  const typeConfigs = {
    info: {
      icon: 'ℹ️',
      color: 'border-blue-500 bg-blue-50',
      badge: 'Info',
      badgeVariant: 'info',
    },
    warning: {
      icon: '⚠️',
      color: 'border-yellow-500 bg-yellow-50',
      badge: 'Peringatan',
      badgeVariant: 'warning',
    },
    success: {
      icon: '✅',
      color: 'border-green-500 bg-green-50',
      badge: 'Sukses',
      badgeVariant: 'success',
    },
    error: {
      icon: '❌',
      color: 'border-red-500 bg-red-50',
      badge: 'Error',
      badgeVariant: 'danger',
    },
  };

  const config = typeConfigs[type];

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-start gap-3 p-3 rounded-lg transition-all',
          !isRead && 'bg-blue-50',
          className
        )}
      >
        <span className="text-xl flex-shrink-0">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-900">{title}</span>
            {!isRead && (
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-500 truncate">{description}</p>
          <span className="text-xs text-gray-400">{createdAt}</span>
        </div>
        {!isRead && onMarkAsRead && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onMarkAsRead(id)}
            className="flex-shrink-0"
          >
            Tandai
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'border-l-4 transition-all',
        config.color,
        !isRead && 'shadow-md',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-2xl">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <Badge variant={config.badgeVariant as any} size="sm">
              {config.badge}
            </Badge>
            {!isRead && (
              <Badge variant="primary" size="xs">Baru</Badge>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">{description}</p>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-gray-400">{createdAt}</span>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col gap-1">
          {!isRead && onMarkAsRead && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onMarkAsRead(id)}
            >
              ✅ Tandai
            </Button>
          )}
          {onDismiss && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onDismiss(id)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default NotificationCard;
