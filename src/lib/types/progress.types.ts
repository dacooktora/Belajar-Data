export type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'reviewing' | 'mastered';

export type SessionProgressStatus = 'pending' | 'in_progress' | 'completed' | 'skipped' | 'reviewing';

export type SubtopicProgressStatus = 'not_started' | 'viewed' | 'studied' | 'understood' | 'needs_review' | 'mastered';

export type QuizProgressStatus = 'not_started' | 'in_progress' | 'submitted' | 'passed' | 'failed' | 'reviewing';

export type PracticeProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'reviewed' | 'rejected' | 'approved';

export type AssignmentProgressStatus = 'not_started' | 'draft' | 'submitted' | 'reviewed' | 'revised' | 'accepted' | 'rejected' | 'resubmitted';

export type ProjectProgressStatus = 'not_started' | 'planning' | 'in_progress' | 'reviewing' | 'submitted' | 'approved' | 'rejected' | 'revision_needed';

export type StreakType = 'daily' | 'weekly' | 'monthly';

export type LearningStyle = 'visual' | 'auditory' | 'reading_writing' | 'kinesthetic' | 'mixed';

export interface DailyProgress {
  dayId: number;
  month: number;
  week: number;
  day: number;
  date: string;
  status: ProgressStatus;
  startTime?: string;
  endTime?: string;
  totalMinutesStudied: number;
  totalMinutesPlanned: number;
  completionPercentage: number;
  isComplete: boolean;
  isOverdue: boolean;
  completedAt?: string;
  sessions: SessionProgress[];
  subtopics: SubtopicProgress[];
  quiz: QuizProgress;
  practice: PracticeProgress[];
  assignment: AssignmentProgress;
  reflectionCompleted: boolean;
  reflectionSubmittedAt?: string;
  personalNotes: string;
  difficulties: string[];
  achievements: string[];
  focusScore: number;
  understandingScore: number;
  energyScore: number;
  satisfactionScore: number;
  distractions: string[];
  topicsNeedsReview: string[];
  reviewPriority: 'low' | 'medium' | 'high' | 'critical';
  nextDayPlan?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionProgress {
  sessionNumber: number;
  sessionId: string;
  title: string;
  status: SessionProgressStatus;
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  plannedDurationMinutes: number;
  isBreak: boolean;
  completedSubtopicIds: string[];
  totalSubtopics: number;
  completionPercentage: number;
  notes: string;
  resourcesViewed: {
    videoIds: string[];
    articleIds: string[];
    documentationIds: string[];
    interactiveIds: string[];
  };
  resourceViewTime: {
    videos: number;
    articles: number;
    documentations: number;
    interactives: number;
  };
  understandingLevel: number;
  focusLevel: number;
  distractionsDuringSession: string[];
  quizTaken: boolean;
  quizScore?: number;
  practiceCompleted: boolean;
  practiceScore?: number;
  needReview: boolean;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubtopicProgress {
  subtopicId: string;
  subtopicName: string;
  sessionNumber: number;
  status: SubtopicProgressStatus;
  startTime?: string;
  completedAt?: string;
  timeSpentMinutes: number;
  estimatedTimeMinutes: number;
  understandingLevel: number;
  confidenceLevel: number;
  isBookmarked: boolean;
  notes: string;
  keyTakeaways: string[];
  questions: string[];
  resourcesViewed: string[];
  practiceAttempted: boolean;
  practiceScore?: number;
  needReview: boolean;
  reviewCount: number;
  lastReviewedAt?: string;
  masteryLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizProgress {
  quizId: string;
  title: string;
  status: QuizProgressStatus;
  startTime?: string;
  submittedAt?: string;
  timeSpentMinutes: number;
  timeLimitMinutes: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedQuestions: number;
  score: number;
  percentageScore: number;
  passingScore: number;
  isPassed: boolean;
  attempts: number;
  maxAttempts: number;
  answers: QuizAnswer[];
  flaggedQuestions: string[];
  timePerQuestion: {
    questionId: string;
    seconds: number;
  }[];
  weakestTopics: string[];
  strongestTopics: string[];
  reviewRecommended: boolean;
  reviewTopics: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAnswer {
  questionId: string;
  questionText: string;
  userAnswer: string | string[] | null;
  correctAnswer: string | string[];
  isCorrect: boolean;
  timeSpentSeconds: number;
  wasSkipped: boolean;
  wasFlagged: boolean;
  pointsEarned: number;
  maxPoints: number;
  explanation?: string;
}

export interface PracticeProgress {
  practiceId: string;
  title: string;
  sessionNumber: number;
  status: PracticeProgressStatus;
  startTime?: string;
  completedAt?: string;
  timeSpentMinutes: number;
  estimatedTimeMinutes: number;
  attempts: number;
  isCompleted: boolean;
  selfAssessment: number;
  score?: number;
  maxScore?: number;
  percentageScore?: number;
  feedback?: string;
  reviewerNotes?: string;
  mistakes: string[];
  lessonsLearned: string[];
  needReview: boolean;
  reviewedAt?: string;
  notes: string;
  filesSubmitted: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentProgress {
  assignmentId: string;
  title: string;
  status: AssignmentProgressStatus;
  startTime?: string;
  submittedAt?: string;
  timeSpentMinutes: number;
  estimatedTimeMinutes: number;
  isSubmitted: boolean;
  isLate: boolean;
  lateDays?: number;
  score?: number;
  maxScore?: number;
  percentageScore?: number;
  feedback?: string;
  reviewerNotes?: string;
  revisionNotes?: string;
  revisionDeadline?: string;
  attempts: number;
  maxAttempts: number;
  filesSubmitted: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    uploadedAt: string;
    version: number;
  }[];
  rubricScores: {
    criterion: string;
    score: number;
    maxScore: number;
    feedback: string;
  }[];
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectProgress {
  projectId: string;
  title: string;
  month: number;
  status: ProjectProgressStatus;
  startDate?: string;
  deadline?: string;
  completedAt?: string;
  totalDays: number;
  daysWorked: number;
  completionPercentage: number;
  isCompleted: boolean;
  isOverdue: boolean;
  phases: ProjectPhase[];
  deliverables: ProjectDeliverable[];
  score?: number;
  maxScore?: number;
  percentageScore?: number;
  feedback?: string;
  reviewerNotes?: string;
  revisionNotes?: string;
  skillsUsed: string[];
  toolsUsed: string[];
  datasetsUsed: string[];
  challenges: string[];
  solutions: string[];
  lessonsLearned: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  presentationUrl?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPhase {
  phaseId: string;
  name: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  startDate?: string;
  endDate?: string;
  completedAt?: string;
  tasks: ProjectTask[];
  notes: string;
}

export interface ProjectTask {
  taskId: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: string;
  completedAt?: string;
  timeSpentMinutes: number;
  dependencies: string[];
  assignedTo?: string;
  notes: string;
}

export interface ProjectDeliverable {
  deliverableId: string;
  name: string;
  description: string;
  type: 'document' | 'spreadsheet' | 'presentation' | 'dashboard' | 'report' | 'code' | 'dataset' | 'other';
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'rejected' | 'revision_needed';
  submittedAt?: string;
  approvedAt?: string;
  fileUrl?: string;
  fileSize?: number;
  version: number;
  feedback?: string;
  score?: number;
  maxScore?: number;
  notes: string;
}

export interface MonthlyProgress {
  month: number;
  year: number;
  title: string;
  status: ProgressStatus;
  totalDays: number;
  daysCompleted: number;
  daysInProgress: number;
  daysNotStarted: number;
  completionPercentage: number;
  totalHoursStudied: number;
  totalHoursPlanned: number;
  averageDailyHours: number;
  totalSubtopics: number;
  subtopicsCompleted: number;
  subtopicsMastered: number;
  subtopicsNeedsReview: number;
  totalQuizzes: number;
  quizzesTaken: number;
  quizzesPassed: number;
  averageQuizScore: number;
  totalPractices: number;
  practicesCompleted: number;
  totalAssignments: number;
  assignmentsSubmitted: number;
  assignmentsAccepted: number;
  projectStatus: ProjectProgressStatus;
  projectScore?: number;
  skillLevels: SkillLevel[];
  strengths: string[];
  weaknesses: string[];
  improvementAreas: string[];
  nextMonthGoals: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillLevel {
  skillName: string;
  category: 'excel' | 'sql' | 'powerbi' | 'python' | 'statistics' | 'visualization' | 'communication' | 'problem_solving' | 'other';
  level: number;
  maxLevel: number;
  percentage: number;
  status: 'not_started' | 'learning' | 'intermediate' | 'advanced' | 'expert';
  lastPracticed?: string;
  practiceCount: number;
  confidenceScore: number;
  notes: string;
}

export interface WeeklyProgress {
  week: number;
  month: number;
  year: number;
  title: string;
  status: ProgressStatus;
  totalDays: number;
  daysCompleted: number;
  completionPercentage: number;
  totalHoursStudied: number;
  totalHoursPlanned: number;
  averageDailyHours: number;
  totalSubtopics: number;
  subtopicsCompleted: number;
  quizzesTaken: number;
  averageQuizScore: number;
  assignmentsSubmitted: number;
  assignmentsAccepted: number;
  skillImprovements: string[];
  challenges: string[];
  nextWeekGoals: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface StreakData {
  type: StreakType;
  currentStreak: number;
  longestStreak: number;
  lastDate: string;
  streakHistory: StreakDay[];
  totalDaysActive: number;
  totalWeeksActive: number;
  totalMonthsActive: number;
  bestMonth?: string;
  bestWeek?: string;
  averageDailyActivity: number;
  consistencyScore: number;
  streakTarget: number;
  currentTargetProgress: number;
  isOnTrack: boolean;
  milestones: StreakMilestone[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface StreakDay {
  date: string;
  isActive: boolean;
  minutesStudied: number;
  subtopicsCompleted: number;
  quizzesTaken: number;
  pointsEarned: number;
  hasReflection: boolean;
  streakType: StreakType;
}

export interface StreakMilestone {
  day: number;
  type: StreakType;
  achievedAt: string;
  badge: string;
  description: string;
  isUnlocked: boolean;
}

export interface UserStatistics {
  totalDays: number;
  totalDaysCompleted: number;
  totalDaysInProgress: number;
  totalDaysNotStarted: number;
  overallCompletionPercentage: number;
  totalHoursStudied: number;
  totalHoursPlanned: number;
  averageDailyHours: number;
  totalSubtopics: number;
  subtopicsCompleted: number;
  subtopicsMastered: number;
  subtopicsNeedsReview: number;
  totalQuizzes: number;
  quizzesTaken: number;
  quizzesPassed: number;
  averageQuizScore: number;
  totalPractices: number;
  practicesCompleted: number;
  totalAssignments: number;
  assignmentsSubmitted: number;
  assignmentsAccepted: number;
  totalProjects: number;
  projectsCompleted: number;
  projectsApproved: number;
  totalPoints: number;
  currentLevel: number;
  nextLevelPoints: number;
  rank: string;
  badges: Badge[];
  skillLevels: SkillLevel[];
  strongestSkills: string[];
  weakestSkills: string[];
  improvementAreas: string[];
  recommendedTopics: string[];
  achievements: Achievement[];
  weeklyStats: WeeklyStats[];
  monthlyStats: MonthlyStats[];
  dailyStats: DailyStats[];
  productivityScore: number;
  consistencyScore: number;
  learningStreak: StreakData;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'study' | 'quiz' | 'project' | 'assignment' | 'skill' | 'mastery' | 'special';
  requirement: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  pointsBonus: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  achievedAt: string;
  category: 'daily' | 'weekly' | 'monthly' | 'special';
  points: number;
  icon: string;
  isShared: boolean;
}

export interface WeeklyStats {
  week: number;
  month: number;
  year: number;
  totalHours: number;
  totalSubtopics: number;
  quizzesTaken: number;
  averageQuizScore: number;
  assignmentsCompleted: number;
  productivityScore: number;
}

export interface MonthlyStats {
  month: number;
  year: number;
  totalHours: number;
  totalDaysCompleted: number;
  totalSubtopics: number;
  quizzesTaken: number;
  averageQuizScore: number;
  assignmentsCompleted: number;
  projectsCompleted: number;
  productivityScore: number;
}

export interface DailyStats {
  day: number;
  month: number;
  year: number;
  totalHours: number;
  subtopicsCompleted: number;
  quizScore?: number;
  assignmentScore?: number;
  productivityScore: number;
  focusScore: number;
  understandingScore: number;
}

export interface StudyTimeAnalytics {
  dailyAverage: number;
  weeklyAverage: number;
  monthlyAverage: number;
  totalHours: number;
  mostProductiveDay: string;
  mostProductiveHour: string;
  leastProductiveDay: string;
  leastProductiveHour: string;
  timeDistribution: {
    label: string;
    hours: number;
    percentage: number;
  }[];
  studyPattern: {
    day: string;
    hours: number;
    percentage: number;
  }[];
  trend: {
    date: string;
    hours: number;
    trendDirection: 'up' | 'down' | 'stable';
  }[];
  projections: {
    estimatedCompletionDate: string;
    remainingHours: number;
    dailyAverageNeeded: number;
    weeklyAverageNeeded: number;
  };
}

export interface LearningAnalytics {
  topPerformingTopics: {
    topic: string;
    score: number;
    timeSpent: number;
  }[];
  strugglingTopics: {
    topic: string;
    score: number;
    timeSpent: number;
    reviewCount: number;
    needsImmediateReview: boolean;
  }[];
  learningPace: {
    expected: number;
    actual: number;
    difference: number;
    paceStatus: 'ahead' | 'on_track' | 'behind' | 'critical';
  };
  knowledgeGaps: {
    gap: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendedActions: string[];
  }[];
  masteryLevels: {
    topic: string;
    level: number;
    status: 'novice' | 'beginner' | 'competent' | 'proficient' | 'expert';
  }[];
  learningStyleMetrics: {
    type: LearningStyle;
    effectivenessScore: number;
    timeSpent: number;
    preferred: boolean;
  }[];
  recommendations: {
    type: 'topic' | 'resource' | 'practice' | 'review' | 'project';
    title: string;
    description: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }[];
}

export interface GoalProgress {
  dailyGoal: {
    target: number;
    achieved: number;
    percentage: number;
    status: 'achieved' | 'in_progress' | 'missed' | 'exceeded';
  };
  weeklyGoal: {
    target: number;
    achieved: number;
    percentage: number;
    status: 'achieved' | 'in_progress' | 'missed' | 'exceeded';
    projectedAchievement: number;
  };
  monthlyGoal: {
    target: number;
    achieved: number;
    percentage: number;
    status: 'achieved' | 'in_progress' | 'missed' | 'exceeded';
    projectedAchievement: number;
  };
  overallGoal: {
    target: number;
    achieved: number;
    percentage: number;
    status: 'achieved' | 'in_progress' | 'missed' | 'exceeded';
    projectedAchievement: number;
    estimatedCompletionDate: string;
  };
  milestoneGoals: MilestoneGoal[];
}

export interface MilestoneGoal {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  percentage: number;
  deadline: string;
  status: 'pending' | 'in_progress' | 'achieved' | 'missed' | 'extended';
  achievedAt?: string;
  isCritical: boolean;
  dependencies: string[];
  reward?: string;
}

export interface ProductivityAnalytics {
  dailyProductivityScore: number;
  weeklyProductivityScore: number;
  monthlyProductivityScore: number;
  overallProductivityScore: number;
  focusScore: number;
  consistencyScore: number;
  efficiencyScore: number;
  peakProductivityTimes: {
    time: string;
    productivity: number;
    activities: string[];
  }[];
  productivityTrend: {
    date: string;
    score: number;
    factors: string[];
  }[];
  distractions: {
    source: string;
    frequency: number;
    impactScore: number;
    solution: string;
  }[];
  recommendations: {
    action: string;
    expectedImprovement: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
}

export interface GamificationProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  xpProgressPercentage: number;
  totalXp: number;
  rank: string;
  badges: Badge[];
  achievements: Achievement[];
  points: {
    total: number;
    today: number;
    week: number;
    month: number;
    breakdown: {
      category: string;
      points: number;
    }[];
  };
  streak: StreakData;
  leaderboardPosition?: number;
  weeklyRanking?: number;
  monthlyRanking?: number;
  nextMilestone: {
    name: string;
    requiredXp: number;
    progress: number;
    progressPercentage: number;
  };
}

export interface ProgressExportData {
  userStats: UserStatistics;
  dailyProgress: DailyProgress[];
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
  projectProgress: ProjectProgress[];
  studyAnalytics: StudyTimeAnalytics;
  learningAnalytics: LearningAnalytics;
  productivityAnalytics: ProductivityAnalytics;
  gamification: GamificationProgress;
  exportedAt: string;
  version: string;
  format: 'json' | 'csv' | 'pdf';
}

export interface ProgressUpdateRequest {
  dayId: number;
  sessionNumber?: number;
  subtopicId?: string;
  status: SessionProgressStatus | SubtopicProgressStatus;
  timeSpent?: number;
  notes?: string;
  understandingLevel?: number;
  focusLevel?: number;
  quizAnswers?: {
    questionId: string;
    answer: string | string[];
  }[];
  practiceScore?: number;
  assignmentFile?: {
    fileName: string;
    fileUrl: string;
    notes?: string;
  };
  reflection?: Partial<DailyProgress>;
  goals?: Partial<GoalProgress>;
}

export interface ProgressResponse {
  success: boolean;
  data?: {
    daily: DailyProgress;
    weekly: WeeklyProgress;
    monthly: MonthlyProgress;
    stats: UserStatistics;
    gamification: GamificationProgress;
    streak: StreakData;
  };
  error?: {
    code: string;
    message: string;
    details?: string;
  };
  timestamp: string;
}

export interface ProgressDashboardData {
  dailyProgress: DailyProgress;
  weeklySummary: WeeklyProgress;
  monthlySummary: MonthlyProgress;
  overallStats: UserStatistics;
  streak: StreakData;
  gamification: GamificationProgress;
  todayGoals: GoalProgress;
  nextMilestone: {
    name: string;
    progress: number;
    target: number;
    daysRemaining: number;
  };
  recentActivity: {
    date: string;
    action: string;
    details: string;
    pointsEarned: number;
  }[];
  recommendedActions: {
    action: string;
    reason: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  notifications: {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    message: string;
    isRead: boolean;
    createdAt: string;
  }[];
}

export interface ProgressAnalyticsData {
  studyTime: StudyTimeAnalytics;
  learning: LearningAnalytics;
  productivity: ProductivityAnalytics;
  goals: GoalProgress;
  trends: {
    daily: DailyStats[];
    weekly: WeeklyStats[];
    monthly: MonthlyStats[];
  };
  insights: {
    type: 'positive' | 'negative' | 'neutral' | 'suggestion';
    title: string;
    description: string;
    recommendation?: string;
    impact?: string;
  }[];
}
export interface ProgressData {
  daily: Record<number, DailyProgress>;
  monthly: Record<number, MonthlyProgress>;
  weekly: Record<number, WeeklyProgress>;
  statistics: UserStatistics;
  lastUpdated: string;
}
