'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface RecommendationCardProps {
  type: 'topic' | 'resource' | 'practice' | 'review' | 'project';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  action: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  tags?: string[];
  className?: string;
}

export function RecommendationCard({
  type,
  title,
  description,
  urgency,
  reason,
  action,
  tags = [],
  className,
}: RecommendationCardProps) {
  const typeIcons = {
    topic: '📚',
    resource: '📖',
    practice: '💻',
    review: '🔄',
    project: '📊',
  };

  const urgencyColors = {
    low: 'border-green-500 bg-green-50',
    medium: 'border-yellow-500 bg-yellow-50',
    high: 'border-orange-500 bg-orange-50',
    critical: 'border-red-500 bg-red-50',
  };

  const urgencyBadges = {
    low: { label: '🟢 Rendah', variant: 'success' },
    medium: { label: '🟡 Sedang', variant: 'warning' },
    high: { label: '🟠 Tinggi', variant: 'warning' },
    critical: { label: '🔴 Kritis', variant: 'danger' },
  } as const;

  const typeLabels = {
    topic: 'Topik',
    resource: 'Resource',
    practice: 'Praktik',
    review: 'Review',
    project: 'Project',
  };

  const icon = typeIcons[type] || '📌';

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'border-l-4',
        urgencyColors[urgency],
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-2xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <Badge variant="secondary" size="xs">{typeLabels[type]}</Badge>
            <Badge variant={urgencyBadges[urgency].variant as any} size="xs">
              {urgencyBadges[urgency].label}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mt-1">{description}</p>

          <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-500">
            <span className="font-medium">Alasan:</span> {reason}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-3">
            {action.href ? (
              <Button
                variant="primary"
                size="sm"
                asChild
              >
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RecommendationCard;
