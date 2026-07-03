'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'study' | 'quiz' | 'project' | 'assignment' | 'skill' | 'mastery' | 'special';
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  pointsBonus: number;
}

export interface BadgeDisplayProps {
  badges: BadgeData[];
  showLocked?: boolean;
  variant?: 'grid' | 'list' | 'compact';
  className?: string;
  onBadgeClick?: (badge: BadgeData) => void;
}

export function BadgeDisplay({
  badges,
  showLocked = true,
  variant = 'grid',
  className,
  onBadgeClick,
}: BadgeDisplayProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500',
  };

  const rarityLabels = {
    common: 'Umum',
    uncommon: 'Langkah',
    rare: 'Jarang',
    epic: 'Epic',
    legendary: 'Legendaris',
  };

  const categoryIcons = {
    streak: '🔥',
    study: '📚',
    quiz: '🧪',
    project: '📊',
    assignment: '📋',
    skill: '⚡',
    mastery: '🏆',
    special: '🌟',
  };

  const filteredBadges = showLocked ? badges : badges.filter(b => b.isUnlocked);
  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const totalCount = badges.length;

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {badges.slice(0, 8).map((badge) => (
          <Tooltip
            key={badge.id}
            content={
              <div className="text-center">
                <div className="font-bold">{badge.name}</div>
                <div className="text-xs text-gray-400">{badge.description}</div>
                {badge.isUnlocked && badge.unlockedAt && (
                  <div className="text-xs text-gray-400 mt-1">
                    🕐 {new Date(badge.unlockedAt).toLocaleDateString('id-ID')}
                  </div>
                )}
              </div>
            }
            position="top"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all cursor-pointer',
                badge.isUnlocked
                  ? cn('bg-gradient-to-br', rarityColors[badge.rarity], 'shadow-md hover:scale-110')
                  : 'bg-gray-200 text-gray-400 grayscale'
              )}
              onClick={() => onBadgeClick?.(badge)}
            >
              {badge.icon}
            </div>
          </Tooltip>
        ))}
        {badges.length > 8 && (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">
            +{badges.length - 8}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-2', className)}>
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer',
              badge.isUnlocked ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 opacity-60',
              'border border-gray-200'
            )}
            onClick={() => onBadgeClick?.(badge)}
          >
            <div
              className={cn(
                'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg',
                badge.isUnlocked
                  ? cn('bg-gradient-to-br', rarityColors[badge.rarity], 'shadow-md')
                  : 'bg-gray-200 text-gray-400 grayscale'
              )}
            >
              {badge.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900">{badge.name}</span>
                <Badge variant="secondary" size="xs">{rarityLabels[badge.rarity]}</Badge>
                {!badge.isUnlocked && (
                  <Badge variant="secondary" size="xs">🔒</Badge>
                )}
              </div>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
            <div className="text-xs text-gray-400">
              +{badge.pointsBonus} XP
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid variant
  return (
    <div className={cn('', className)}>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-900">🏅 Badge</h3>
        <Badge variant="primary" size="sm">
          {unlockedCount}/{totalCount} Terbuka
        </Badge>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {filteredBadges.map((badge) => (
          <Tooltip
            key={badge.id}
            content={
              <div className="text-center max-w-[200px]">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="font-bold text-white">{badge.name}</div>
                <div className="text-xs text-gray-300">{badge.description}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {rarityLabels[badge.rarity]} • +{badge.pointsBonus} XP
                </div>
                {badge.isUnlocked && badge.unlockedAt && (
                  <div className="text-xs text-gray-400">
                    🕐 {new Date(badge.unlockedAt).toLocaleDateString('id-ID')}
                  </div>
                )}
                {!badge.isUnlocked && (
                  <div className="text-xs text-gray-400 mt-1">🔒 Belum terbuka</div>
                )}
              </div>
            }
            position="top"
          >
            <div
              className={cn(
                'relative flex flex-col items-center p-3 rounded-xl transition-all cursor-pointer',
                badge.isUnlocked
                  ? cn(
                      'bg-gradient-to-br',
                      rarityColors[badge.rarity],
                      'shadow-md hover:scale-105 hover:shadow-lg'
                    )
                  : 'bg-gray-200 grayscale hover:bg-gray-300'
              )}
              onClick={() => onBadgeClick?.(badge)}
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="text-[10px] font-medium text-white mt-1 text-center line-clamp-1">
                {badge.name}
              </div>
              {!badge.isUnlocked && (
                <div className="absolute top-1 right-1 text-gray-500 text-xs">🔒</div>
              )}
              {badge.rarity === 'legendary' && badge.isUnlocked && (
                <div className="absolute -top-1 -right-1">
                  <span className="text-xs">✨</span>
                </div>
              )}
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default BadgeDisplay;
