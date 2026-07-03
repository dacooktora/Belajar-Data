export type AnalyticsTimeframe = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';

export type AnalyticsMetricType = 'study_time' | 'completion_rate' | 'quiz_score' | 'productivity' | 'consistency' | 'mastery' | 'engagement' | 'retention';

export type TrendDirection = 'up' | 'down' | 'stable' | 'volatile';

export type InsightSeverity = 'low' | 'medium' | 'high' | 'critical';

export type InsightType = 'positive' | 'negative' | 'neutral' | 'opportunity' | 'warning' | 'suggestion' | 'achievement';

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'scatter' | 'heatmap' | 'funnel' | 'treemap' | 'gauge';

export interface AnalyticsBase {
  id: string;
  userId: string;
  timeframe: AnalyticsTimeframe;
  startDate: string;
  endDate: string;
  generatedAt: string;
  version: string;
}

export interface StudyTimeAnalytics extends AnalyticsBase {
  totalHours: number;
  averageDailyHours: number;
  averageWeeklyHours: number;
  averageMonthlyHours: number;
  maxDailyHours: number;
  minDailyHours: number;
  medianDailyHours: number;
  standardDeviation: number;
  consistencyScore: number;
  trend: TrendDirection;
  hourlyDistribution: {
    hour: number;
    minutes: number;
    percentage: number;
  }[];
  dailyDistribution: {
    day: string;
    hours: number;
    percentage: number;
  }[];
  weeklyDistribution: {
    week: number;
    hours: number;
    percentage: number;
    trend: TrendDirection;
  }[];
  monthlyDistribution: {
    month: number;
    hours: number;
    percentage: number;
    trend: TrendDirection;
  }[];
  mostProductiveDay: {
    day: string;
    hours: number;
    activities: string[];
  };
  leastProductiveDay: {
    day: string;
    hours: number;
    reasons: string[];
  };
  mostProductiveHour: {
    hour: number;
    productivity: number;
    activities: string[];
  };
  leastProductiveHour: {
    hour: number;
    productivity: number;
    reasons: string[];
  };
  studyPatterns: {
    pattern: string;
    frequency: number;
    effectiveness: number;
    description: string;
  }[];
  timeOfDayAnalysis: {
    morning: { hours: number; productivity: number };
    afternoon: { hours: number; productivity: number };
    evening: { hours: number; productivity: number };
    night: { hours: number; productivity: number };
  };
  projections: {
    estimatedCompletionDate: string;
    remainingHours: number;
    dailyAverageNeeded: number;
    weeklyAverageNeeded: number;
    monthlyAverageNeeded: number;
    confidenceLevel: number;
    scenarios: {
      scenario: 'optimistic' | 'realistic' | 'pessimistic';
      completionDate: string;
      dailyHoursNeeded: number;
    }[];
  };
  benchmarks: {
    category: string;
    userValue: number;
    averageValue: number;
    topValue: number;
    percentile: number;
  }[];
  insights: AnalyticsInsight[];
}

export interface CompletionAnalytics extends AnalyticsBase {
  overallCompletionPercentage: number;
  dailyCompletionRate: {
    date: string;
    completionPercentage: number;
    trend: TrendDirection;
  }[];
  weeklyCompletionRate: {
    week: number;
    completionPercentage: number;
    trend: TrendDirection;
  }[];
  monthlyCompletionRate: {
    month: number;
    completionPercentage: number;
    trend: TrendDirection;
  }[];
  byMonth: {
    month: number;
    totalDays: number;
    completedDays: number;
    inProgressDays: number;
    notStartedDays: number;
    completionPercentage: number;
    status: 'on_track' | 'behind' | 'ahead' | 'critical';
  }[];
  byWeek: {
    week: number;
    totalDays: number;
    completedDays: number;
    completionPercentage: number;
    status: 'on_track' | 'behind' | 'ahead' | 'critical';
  }[];
  byTopic: {
    topic: string;
    totalSubtopics: number;
    completedSubtopics: number;
    completionPercentage: number;
    status: 'on_track' | 'behind' | 'ahead' | 'critical';
  }[];
  projectedCompletionDate: string;
  pace: {
    expected: number;
    actual: number;
    difference: number;
    paceStatus: 'ahead' | 'on_track' | 'behind' | 'critical';
    daysAheadOrBehind: number;
  };
  bottlenecks: {
    topic: string;
    averageTimeToComplete: number;
    expectedTime: number;
    delayPercentage: number;
    reason: string;
    recommendation: string;
  }[];
  insights: AnalyticsInsight[];
}

export interface QuizAnalytics extends AnalyticsBase {
  totalQuizzes: number;
  quizzesTaken: number;
  quizzesSkipped: number;
  quizzesPassed: number;
  quizzesFailed: number;
  passRate: number;
  averageScore: number;
  medianScore: number;
  highestScore: number;
  lowestScore: number;
  scoreDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
  scoresOverTime: {
    date: string;
    score: number;
    passingScore: number;
    status: 'passed' | 'failed';
  }[];
  byTopic: {
    topic: string;
    averageScore: number;
    questionCount: number;
    strengthLevel: 'weak' | 'moderate' | 'strong';
  }[];
  byDifficulty: {
    difficulty: 'easy' | 'medium' | 'hard';
    averageScore: number;
    questionCount: number;
  }[];
  questionPerformance: {
    questionId: string;
    topic: string;
    correctRate: number;
    averageTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    needsReview: boolean;
  }[];
  timeAnalysis: {
    averageTimePerQuestion: number;
    totalTimeSpent: number;
    fastestQuiz: { name: string; time: number };
    slowestQuiz: { name: string; time: number };
  };
  improvementRate: number;
  weakTopics: {
    topic: string;
    averageScore: number;
    questionCount: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    recommendedActions: string[];
  }[];
  strongTopics: {
    topic: string;
    averageScore: number;
    questionCount: number;
  }[];
  insights: AnalyticsInsight[];
}

export interface SkillAnalytics extends AnalyticsBase {
  skills: SkillProficiency[];
  overallMasteryLevel: number;
  skillDistribution: {
    category: string;
    skills: string[];
    averageLevel: number;
  }[];
  skillGrowthOverTime: {
    date: string;
    skill: string;
    level: number;
  }[];
  topSkills: {
    skill: string;
    level: number;
    category: string;
  }[];
  weakestSkills: {
    skill: string;
    level: number;
    category: string;
    recommendedActions: string[];
  }[];
  skillGaps: {
    gap: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    impact: string;
    recommendedResources: string[];
  }[];
  requiredSkillsProgress: {
    skill: string;
    currentLevel: number;
    requiredLevel: number;
    gap: number;
    progressPercentage: number;
    estimatedTimeToReach: string;
  }[];
  skillRelationships: {
    skill: string;
    relatedSkills: string[];
    synergyScore: number;
    recommendation: string;
  }[];
  learningStyleMetrics: {
    type: 'visual' | 'auditory' | 'reading_writing' | 'kinesthetic' | 'mixed';
    effectivenessScore: number;
    timeSpent: number;
    preferred: boolean;
    improvementSuggestion: string;
  }[];
  insights: AnalyticsInsight[];
}

export interface SkillProficiency {
  skillId: string;
  name: string;
  category: 'excel' | 'sql' | 'powerbi' | 'python' | 'statistics' | 'visualization' | 'communication' | 'problem_solving' | 'other';
  level: number;
  maxLevel: number;
  percentage: number;
  status: 'not_started' | 'learning' | 'intermediate' | 'advanced' | 'expert';
  lastPracticed: string;
  practiceCount: number;
  confidenceScore: number;
  timeSpent: number;
  improvementRate: number;
  prerequisites: string[];
  relatedSkills: string[];
  resources: {
    type: string;
    count: number;
    lastUsed: string;
  };
  strengths: string[];
  weaknesses: string[];
  notes: string;
}

export interface ProductivityAnalytics extends AnalyticsBase {
  overallProductivityScore: number;
  dailyProductivityScores: {
    date: string;
    score: number;
    factors: string[];
    activities: string[];
  }[];
  weeklyProductivityScores: {
    week: number;
    score: number;
    trend: TrendDirection;
    factors: string[];
  }[];
  monthlyProductivityScores: {
    month: number;
    score: number;
    trend: TrendDirection;
    factors: string[];
  }[];
  focusScore: number;
  consistencyScore: number;
  efficiencyScore: number;
  peakProductivityTimes: {
    time: string;
    productivity: number;
    activities: string[];
    frequency: number;
  }[];
  productivityFactors: {
    factor: string;
    positiveImpact: number;
    negativeImpact: number;
    netImpact: number;
    recommendation: string;
  }[];
  distractions: {
    source: string;
    frequency: number;
    impactScore: number;
    productivityLoss: number;
    solution: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  timeWasters: {
    activity: string;
    timeLost: number;
    frequency: number;
    suggestion: string;
  }[];
  productivityTrend: {
    direction: TrendDirection;
    changePercentage: number;
    period: string;
  };
  efficiencyMetrics: {
    subtopicsPerHour: number;
    quizzesPerHour: number;
    assignmentsPerHour: number;
    averageFocusDuration: number;
    breakFrequency: number;
    breakEfficiency: number;
  };
  recommendations: {
    action: string;
    expectedImprovement: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    implementationTime: string;
  }[];
  insights: AnalyticsInsight[];
}

export interface EngagementAnalytics extends AnalyticsBase {
  dailyEngagement: {
    date: string;
    score: number;
    activities: string[];
    duration: number;
  }[];
  weeklyEngagement: {
    week: number;
    score: number;
    trend: TrendDirection;
    activities: string[];
  }[];
  monthlyEngagement: {
    month: number;
    score: number;
    trend: TrendDirection;
    activities: string[];
  }[];
  interactionMetrics: {
    quizzesStarted: number;
    quizzesCompleted: number;
    practicesStarted: number;
    practicesCompleted: number;
    assignmentsStarted: number;
    assignmentsCompleted: number;
    projectsStarted: number;
    projectsCompleted: number;
    resourcesAccessed: number;
    resourcesCompleted: number;
  };
  completionRates: {
    quizzes: number;
    practices: number;
    assignments: number;
    projects: number;
    resources: number;
  };
  averageEngagementTime: number;
  engagementPatterns: {
    pattern: string;
    frequency: number;
    description: string;
  }[];
  engagementPeaks: {
    time: string;
    activities: string[];
    engagementScore: number;
  }[];
  engagementValleys: {
    time: string;
    activities: string[];
    engagementScore: number;
    reasons: string[];
  }[];
  retentionMetrics: {
    dailyRetention: number;
    weeklyRetention: number;
    monthlyRetention: number;
    churnRisk: 'low' | 'medium' | 'high';
  };
  insights: AnalyticsInsight[];
}

export interface RetentionAnalytics extends AnalyticsBase {
  dailyRetention: {
    date: string;
    retainedUsers: number;
    activeUsers: number;
    retentionRate: number;
  }[];
  weeklyRetention: {
    week: number;
    retainedUsers: number;
    activeUsers: number;
    retentionRate: number;
    trend: TrendDirection;
  }[];
  monthlyRetention: {
    month: number;
    retainedUsers: number;
    activeUsers: number;
    retentionRate: number;
    trend: TrendDirection;
  }[];
  cohortRetention: {
    cohort: string;
    week1: number;
    week2: number;
    week3: number;
    week4: number;
    week8: number;
    week12: number;
  }[];
  churnRate: number;
  churnRiskFactors: {
    factor: string;
    impactScore: number;
    frequency: number;
    recommendation: string;
  }[];
  reEngagementRate: number;
  dropOffPoints: {
    point: string;
    dropOffRate: number;
    reasons: string[];
    solution: string;
  }[];
  returningUsers: {
    total: number;
    percentage: number;
    averageReturnTime: number;
  }[];
  insights: AnalyticsInsight[];
}

export interface ComparativeAnalytics extends AnalyticsBase {
  comparedWith: {
    id: string;
    name: string;
    type: 'user' | 'cohort' | 'average' | 'target';
  }[];
  metrics: {
    metric: string;
    userValue: number;
    comparedValues: {
      name: string;
      value: number;
      difference: number;
      percentageDifference: number;
    }[];
    percentile: number;
    rank: number;
  }[];
  performanceGaps: {
    metric: string;
    gap: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendation: string;
  }[];
  strengths: {
    metric: string;
    value: number;
    comparedValue: number;
    advantage: number;
  }[];
  weaknesses: {
    metric: string;
    value: number;
    comparedValue: number;
    deficit: number;
    improvementPlan: string;
  }[];
  overallComparison: {
    score: number;
    comparisonScore: number;
    difference: number;
    status: 'ahead' | 'on_par' | 'behind' | 'significantly_behind';
  };
  insights: AnalyticsInsight[];
}

export interface PredictiveAnalytics extends AnalyticsBase {
  predictions: {
    metric: string;
    currentValue: number;
    predictedValue: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
    confidenceLevel: number;
    timeframe: string;
    trend: TrendDirection;
  }[];
  forecast: {
    date: string;
    predictedValue: number;
    lowerBound: number;
    upperBound: number;
    actualValue?: number;
  }[];
  riskAssessment: {
    risk: string;
    probability: number;
    impact: 'low' | 'medium' | 'high' | 'critical';
    mitigationStrategy: string;
  }[];
  opportunities: {
    opportunity: string;
    potentialGain: number;
    probability: number;
    actionRequired: string;
    timeframe: string;
  }[];
  recommendedActions: {
    action: string;
    expectedImpact: number;
    confidenceLevel: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    implementationTime: string;
  }[];
  milestoneProjections: {
    milestone: string;
    expectedDate: string;
    confidenceLevel: number;
    status: 'on_track' | 'at_risk' | 'delayed';
    recommendedAction: string;
  }[];
  insights: AnalyticsInsight[];
}

export interface AnalyticsInsight {
  id: string;
  type: InsightType;
  severity: InsightSeverity;
  category: string;
  title: string;
  description: string;
  metric: string;
  value: number;
  benchmark: number;
  difference: number;
  percentageDifference: number;
  recommendation: string;
  actionItems: {
    action: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    expectedImpact: string;
    estimatedEffort: string;
  }[];
  relatedInsights: string[];
  generatedAt: string;
  isDismissed: boolean;
  isRead: boolean;
  isActioned: boolean;
}

export interface AnalyticsReport {
  id: string;
  title: string;
  description: string;
  type: 'summary' | 'detailed' | 'executive' | 'technical';
  timeframe: AnalyticsTimeframe;
  startDate: string;
  endDate: string;
  generatedAt: string;
  sections: ReportSection[];
  summary: {
    keyFindings: string[];
    recommendations: string[];
    overallStatus: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
    score: number;
  };
  charts: ReportChart[];
  downloadUrls: {
    format: 'pdf' | 'csv' | 'json' | 'xlsx';
    url: string;
  }[];
  shareableLink: string;
  isPublic: boolean;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'overview' | 'metrics' | 'charts' | 'insights' | 'recommendations' | 'comparison';
  content: string;
  metrics: {
    name: string;
    value: number | string;
    change: number;
    trend: TrendDirection;
  }[];
  insights: AnalyticsInsight[];
  subSections: ReportSection[];
}

export interface ReportChart {
  id: string;
  title: string;
  type: ChartType;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
  options: {
    xAxisLabel: string;
    yAxisLabel: string;
    showLegend: boolean;
    showGrid: boolean;
    animated: boolean;
    height: number;
  };
}

export interface AnalyticsFilter {
  metricTypes: AnalyticsMetricType[];
  timeframe: AnalyticsTimeframe;
  startDate?: string;
  endDate?: string;
  categories: string[];
  skills: string[];
  months: number[];
  weeks: number[];
  minScore: number;
  maxScore: number;
  status: ProgressStatus[];
  sortBy: 'date' | 'score' | 'completion' | 'time';
  sortOrder: 'asc' | 'desc';
  limit: number;
  offset: number;
}

export interface AnalyticsDataPoint {
  date: string;
  value: number;
  metadata: {
    type: string;
    category: string;
    description: string;
    additionalData: Record<string, any>;
  };
}

export interface AnalyticsTimeSeries {
  metric: string;
  dataPoints: AnalyticsDataPoint[];
  trend: TrendDirection;
  changePercentage: number;
  average: number;
  median: number;
  min: number;
  max: number;
  standardDeviation: number;
  seasonality?: {
    period: string;
    pattern: string;
    amplitude: number;
  };
  anomalies: {
    date: string;
    value: number;
    expectedValue: number;
    deviation: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export interface AnalyticsDashboardData {
  studyTime: StudyTimeAnalytics;
  completion: CompletionAnalytics;
  quizzes: QuizAnalytics;
  skills: SkillAnalytics;
  productivity: ProductivityAnalytics;
  engagement: EngagementAnalytics;
  retention: RetentionAnalytics;
  comparative?: ComparativeAnalytics;
  predictive?: PredictiveAnalytics;
  topInsights: AnalyticsInsight[];
  quickStats: {
    totalHours: number;
    completionRate: number;
    averageScore: number;
    productivityScore: number;
    streakDays: number;
  };
  charts: ReportChart[];
  recentActivity: {
    date: string;
    action: string;
    details: string;
    pointsEarned: number;
  }[];
}

export interface AnalyticsExportData {
  studyTime: StudyTimeAnalytics;
  completion: CompletionAnalytics;
  quizzes: QuizAnalytics;
  skills: SkillAnalytics;
  productivity: ProductivityAnalytics;
  engagement: EngagementAnalytics;
  retention: RetentionAnalytics;
  comparative?: ComparativeAnalytics;
  predictive?: PredictiveAnalytics;
  insights: AnalyticsInsight[];
  generatedAt: string;
  version: string;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  metadata: {
    userId: string;
    userName: string;
    timeframe: AnalyticsTimeframe;
    startDate: string;
    endDate: string;
    includeCharts: boolean;
    includeInsights: boolean;
  };
}

export interface AnalyticsRequest {
  timeframe: AnalyticsTimeframe;
  startDate?: string;
  endDate?: string;
  metrics: AnalyticsMetricType[];
  filters: AnalyticsFilter;
  includeInsights: boolean;
  includeCharts: boolean;
  includeComparisons: boolean;
  includePredictions: boolean;
}

export interface AnalyticsResponse {
  success: boolean;
  data?: {
    studyTime?: StudyTimeAnalytics;
    completion?: CompletionAnalytics;
    quizzes?: QuizAnalytics;
    skills?: SkillAnalytics;
    productivity?: ProductivityAnalytics;
    engagement?: EngagementAnalytics;
    retention?: RetentionAnalytics;
    comparative?: ComparativeAnalytics;
    predictive?: PredictiveAnalytics;
    insights: AnalyticsInsight[];
    charts: ReportChart[];
    summary: {
      keyMetrics: {
        name: string;
        value: number | string;
        change: number;
        trend: TrendDirection;
      }[];
      overallStatus: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
      recommendations: string[];
    };
  };
  error?: {
    code: string;
    message: string;
    details?: string;
  };
  timestamp: string;
}

export interface AnalyticsWebhookPayload {
  eventType: 'daily_summary' | 'weekly_summary' | 'monthly_summary' | 'milestone_achieved' | 'insight_generated' | 'anomaly_detected';
  userId: string;
  timestamp: string;
  data: {
    insight?: AnalyticsInsight;
    summary?: {
      metrics: {
        name: string;
        value: number;
        change: number;
      }[];
      status: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
    };
    anomaly?: {
      metric: string;
      expectedValue: number;
      actualValue: number;
      deviation: number;
      severity: 'low' | 'medium' | 'high';
    };
  };
  metadata: {
    version: string;
    environment: string;
  };
}
