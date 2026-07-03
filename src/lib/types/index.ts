// ============================================================
// INDEX TYPES - Export Semua Types dari Semua File
// ============================================================
// File ini berfungsi sebagai single entry point untuk semua types
// Cara import: import { TypeName } from '@/lib/types'
// ============================================================

// ============================================================
// 1. ROADMAP TYPES
// ============================================================
export type {
  // Resource Types
  VideoResource,
  ArticleResource,
  DocumentationResource,
  InteractiveResource,
  ResourceCollection,

  // Subtopic Types
  Subtopic,

  // Practice Types
  Practice,

  // Session Types
  Session,

  // Quiz Types
  QuizQuestion,
  Quiz,

  // Assignment Types
  Assignment,

  // Reflection Types
  Reflection,

  // Evaluation Types
  Evaluation,

  // Day Types
  DayData,

  // Week Types
  WeekData,

  // Final Project Types
  FinalProject,

  // Month Types
  MonthData,

  // Roadmap Types
  RoadmapData,

  // Utility Types
  LearningStatus,
  DifficultyLevel,
  ResourceType,
  SearchFilter,
  UserProgress,
  RoadmapSummary,
} from './roadmap.types';

// ============================================================
// 2. DAILY TYPES
// ============================================================
export type {
  // Enum & Constant Types
  SessionStatus,
  SessionType,
  DailyDifficulty,
  QuizQuestionType,
  QuizStatus,
  AssignmentStatus,
  PracticeCategory,

  // Daily Schedule Types
  DailySession,
  DailySubtopic,

  // Daily Resource Types
  DailyVideoResource,
  DailyArticleResource,
  DailyDocumentationResource,
  DailyInteractiveResource,
  DailyResourceSet,

  // Daily Practice Types
  DailyPractice,

  // Daily Quiz Types
  DailyQuizQuestion,
  DailyQuiz,

  // Daily Assignment Types
  DailyAssignment,

  // Daily Reflection Types
  DailyReflection,

  // Daily Progress Types
  DailyUserProgress,

  // Daily Statistics Types
  DailyStatistics,

  // Daily Analytics Types
  DailyAnalytics,

  // Daily Settings Types
  DailySettings,

  // Daily Summary Types
  DailySummary,

  // Daily Export Types
  DailyExportData,

  // Daily Complete Data Types
  CompleteDailyData,
  DailyAPIResponse,
  DailyProgressUpdateRequest,
} from './daily.types';

// ============================================================
// 3. PROGRESS TYPES
// ============================================================
export type {
  // Enum & Status Types
  ProgressStatus,
  SessionProgressStatus,
  SubtopicProgressStatus,
  QuizProgressStatus,
  PracticeProgressStatus,
  AssignmentProgressStatus,
  ProjectProgressStatus,
  StreakType,
  LearningStyle,

  // Daily Progress
  DailyProgress,

  // Session Progress
  SessionProgress,

  // Subtopic Progress
  SubtopicProgress,

  // Quiz Progress
  QuizProgress,
  QuizAnswer,

  // Practice Progress
  PracticeProgress,

  // Assignment Progress
  AssignmentProgress,

  // Project Progress
  ProjectProgress,
  ProjectPhase,
  ProjectTask,
  ProjectDeliverable,

  // Monthly Progress
  MonthlyProgress,

  // Weekly Progress
  WeeklyProgress,

  // Streak Data
  StreakData,
  StreakDay,
  StreakMilestone,

  // User Statistics
  UserStatistics,
  Badge,
  Achievement,
  WeeklyStats,
  MonthlyStats,
  DailyStats,

  // Skill Level
  SkillLevel,

  // Analytics
  StudyTimeAnalytics as ProgressStudyTimeAnalytics,
  LearningAnalytics,
  GoalProgress,
  MilestoneGoal,
  ProductivityAnalytics as ProgressProductivityAnalytics,

  // Gamification
  GamificationProgress,

  // Export & API
  ProgressExportData,
  ProgressUpdateRequest,
  ProgressResponse,
  ProgressDashboardData,
  ProgressAnalyticsData,
} from './progress.types';

// ============================================================
// 4. ANALYTICS TYPES
// ============================================================
export type {
  // Enum & Base Types
  AnalyticsTimeframe,
  AnalyticsMetricType,
  TrendDirection,
  InsightSeverity,
  InsightType,
  ChartType,
  AnalyticsBase,

  // Study Time Analytics
  StudyTimeAnalytics,

  // Completion Analytics
  CompletionAnalytics,

  // Quiz Analytics
  QuizAnalytics,

  // Skill Analytics
  SkillAnalytics,
  SkillProficiency,

  // Productivity Analytics
  ProductivityAnalytics,

  // Engagement Analytics
  EngagementAnalytics,

  // Retention Analytics
  RetentionAnalytics,

  // Comparative Analytics
  ComparativeAnalytics,

  // Predictive Analytics
  PredictiveAnalytics,

  // Analytics Insight
  AnalyticsInsight,

  // Analytics Report
  AnalyticsReport,
  ReportSection,
  ReportChart,

  // Filter & Request
  AnalyticsFilter,
  AnalyticsDataPoint,
  AnalyticsTimeSeries,
  AnalyticsRequest,

  // Dashboard & Export
  AnalyticsDashboardData,
  AnalyticsExportData,
  AnalyticsResponse,
  AnalyticsWebhookPayload,
} from './analytics.types';

// ============================================================
// 5. RE-EXPORT SEMUA TYPES UNTUK KEMUDAHAN
// ============================================================
// Semua types di atas bisa di-import dari satu tempat:
// import { RoadmapData, DayData, DailyProgress, StudyTimeAnalytics } from '@/lib/types'
// ============================================================

// ============================================================
// 6. TYPE UTILITY UNTUK DEVELOPMENT
// ============================================================

/**
 * Utility type untuk membuat semua properti menjadi required
 * Digunakan untuk form validation atau testing
 */
export type RequiredDeep<T> = {
  [P in keyof T]-?: RequiredDeep<T[P]>;
};

/**
 * Utility type untuk membuat semua properti menjadi optional
 * Digunakan untuk partial updates
 */
export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

/**
 * Utility type untuk membuat semua properti menjadi readonly
 * Digunakan untuk immutable data
 */
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

/**
 * Utility type untuk membuat semua properti nullable
 * Digunakan untuk data yang mungkin null
 */
export type NullableDeep<T> = {
  [P in keyof T]: NullableDeep<T[P]> | null;
};

/**
 * Utility type untuk pick properti dengan tipe tertentu
 * Digunakan untuk filtering berdasarkan tipe
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/**
 * Utility type untuk omit properti dengan tipe tertentu
 * Digunakan untuk filtering berdasarkan tipe
 */
export type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

/**
 * Utility type untuk membuat union type menjadi intersection
 * Digunakan untuk menggabungkan type
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * Utility type untuk mengambil nilai dari array
 * Digunakan untuk inferensi type array
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Utility type untuk membuat object dengan key tertentu
 * Digunakan untuk mapping type
 */
export type RecordWithKeys<K extends string | number | symbol, T> = {
  [P in K]: T;
};

/**
 * Utility type untuk membuat union type dari nilai literal
 * Digunakan untuk const assertion
 */
export type ValueOf<T> = T[keyof T];

/**
 * Utility type untuk membuat type yang hanya mengambil field tertentu
 * Digunakan untuk projection
 */
export type Projection<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Utility type untuk membuat type dengan field yang di-rename
 * Digunakan untuk mapping
 */
export type RenameField<T, Old extends keyof T, New extends string> = {
  [P in keyof T as P extends Old ? New : P]: T[P];
};

/**
 * Utility type untuk membuat type dengan prefix
 * Digunakan untuk namespace
 */
export type Prefixed<T, P extends string> = {
  [K in keyof T as `${P}${K extends string ? K : never}`]: T[K];
};

/**
 * Utility type untuk membuat type dengan suffix
 * Digunakan untuk namespace
 */
export type Suffixed<T, S extends string> = {
  [K in keyof T as `${K extends string ? K : never}${S}`]: T[K];
};

/**
 * Utility type untuk membuat type dengan field yang dipilih berdasarkan prefix
 * Digunakan untuk filtering
 */
export type PickByPrefix<T, P extends string> = {
  [K in keyof T as K extends `${P}${infer _}` ? K : never]: T[K];
};

/**
 * Utility type untuk membuat type dengan field yang dipilih berdasarkan suffix
 * Digunakan untuk filtering
 */
export type PickBySuffix<T, S extends string> = {
  [K in keyof T as K extends `${infer _}${S}` ? K : never]: T[K];
};

/**
 * Utility type untuk menggabungkan dua type dengan override
 * Digunakan untuk merge
 */
export type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never;
};

/**
 * Utility type untuk membuat type yang hanya mengandung primitive
 * Digunakan untuk serialization
 */
export type Primitive = string | number | boolean | null | undefined;

/**
 * Utility type untuk membuat type yang bisa di-serialize
 * Digunakan untuk JSON
 */
export type Serializable<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? Array<Serializable<U>>
  : T extends Date
  ? string
  : T extends object
  ? { [K in keyof T]: Serializable<T[K]> }
  : never;

/**
 * Utility type untuk membuat type dengan field yang di-parse dari string
 * Digunakan untuk parsing
 */
export type ParseFromString<T> = T extends `${infer N extends number}`
  ? N
  : T extends 'true'
  ? true
  : T extends 'false'
  ? false
  : T extends 'null'
  ? null
  : T extends 'undefined'
  ? undefined
  : T;

// ============================================================
// 7. TYPE NAMESPACE UNTUK ORGANISASI
// ============================================================

/**
 * Namespace untuk semua type yang berhubungan dengan Roadmap
 */
export namespace Roadmap {
  export type Data = RoadmapData;
  export type Month = MonthData;
  export type Week = WeekData;
  export type Day = DayData;
  export type Project = FinalProject;
  export type Status = LearningStatus;
  export type Difficulty = DifficultyLevel;
}

/**
 * Namespace untuk semua type yang berhubungan dengan Daily
 */
export namespace Daily {
  export type Data = DayData;
  export type Session = DailySession;
  export type Subtopic = DailySubtopic;
  export type Quiz = DailyQuiz;
  export type Assignment = DailyAssignment;
  export type Practice = DailyPractice;
  export type Reflection = DailyReflection;
  export type Progress = DailyUserProgress;
  export type Statistics = DailyStatistics;
  export type Summary = DailySummary;
}

/**
 * Namespace untuk semua type yang berhubungan dengan Progress
 */
export namespace Progress {
  export type Daily = DailyProgress;
  export type Session = SessionProgress;
  export type Subtopic = SubtopicProgress;
  export type Quiz = QuizProgress;
  export type Practice = PracticeProgress;
  export type Assignment = AssignmentProgress;
  export type Project = ProjectProgress;
  export type Monthly = MonthlyProgress;
  export type Weekly = WeeklyProgress;
  export type Streak = StreakData;
  export type Statistics = UserStatistics;
  export type Gamification = GamificationProgress;
}

/**
 * Namespace untuk semua type yang berhubungan dengan Analytics
 */
export namespace Analytics {
  export type StudyTime = StudyTimeAnalytics;
  export type Completion = CompletionAnalytics;
  export type Quiz = QuizAnalytics;
  export type Skill = SkillAnalytics;
  export type Productivity = ProductivityAnalytics;
  export type Engagement = EngagementAnalytics;
  export type Retention = RetentionAnalytics;
  export type Comparative = ComparativeAnalytics;
  export type Predictive = PredictiveAnalytics;
  export type Insight = AnalyticsInsight;
  export type Report = AnalyticsReport;
}

// ============================================================
// 8. TYPE GUARDS UNTUK RUNTIME TYPE CHECKING
// ============================================================

/**
 * Type guard untuk mengecek apakah value adalah ProgressStatus
 */
export function isProgressStatus(value: unknown): value is ProgressStatus {
  return (
    typeof value === 'string' &&
    ['not_started', 'in_progress', 'completed', 'reviewing', 'mastered'].includes(value)
  );
}

/**
 * Type guard untuk mengecek apakah value adalah SessionStatus
 */
export function isSessionStatus(value: unknown): value is SessionStatus {
  return (
    typeof value === 'string' &&
    ['pending', 'in_progress', 'completed', 'skipped', 'reviewing'].includes(value)
  );
}

/**
 * Type guard untuk mengecek apakah value adalah QuizStatus
 */
export function isQuizStatus(value: unknown): value is QuizStatus {
  return (
    typeof value === 'string' &&
    ['not_started', 'in_progress', 'submitted', 'passed', 'failed', 'reviewing'].includes(value)
  );
}

/**
 * Type guard untuk mengecek apakah value adalah AssignmentStatus
 */
export function isAssignmentStatus(value: unknown): value is AssignmentStatus {
  return (
    typeof value === 'string' &&
    ['not_started', 'draft', 'submitted', 'reviewed', 'revised', 'accepted', 'rejected', 'resubmitted'].includes(
      value
    )
  );
}

/**
 * Type guard untuk mengecek apakah value adalah DailyDifficulty
 */
export function isDailyDifficulty(value: unknown): value is DailyDifficulty {
  return (
    typeof value === 'string' &&
    ['beginner', 'intermediate', 'advanced', 'expert'].includes(value)
  );
}

/**
 * Type guard untuk mengecek apakah value adalah AnalyticsTimeframe
 */
export function isAnalyticsTimeframe(value: unknown): value is AnalyticsTimeframe {
  return (
    typeof value === 'string' &&
    ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom'].includes(value)
  );
}

// ============================================================
// 9. TYPE CONSTANTS UNTUK DEFAULT VALUES
// ============================================================

/**
 * Default values untuk tipe-tipe utama
 */
export const DEFAULT_VALUES = {
  PROGRESS_STATUS: 'not_started' as ProgressStatus,
  SESSION_STATUS: 'pending' as SessionStatus,
  QUIZ_STATUS: 'not_started' as QuizStatus,
  ASSIGNMENT_STATUS: 'not_started' as AssignmentStatus,
  DAILY_DIFFICULTY: 'beginner' as DailyDifficulty,
  ANALYTICS_TIMEFRAME: 'daily' as AnalyticsTimeframe,
  INSIGHT_TYPE: 'neutral' as InsightType,
  INSIGHT_SEVERITY: 'low' as InsightSeverity,
  TREND_DIRECTION: 'stable' as TrendDirection,
  LEARNING_STYLE: 'mixed' as LearningStyle,
  STREAK_TYPE: 'daily' as StreakType,
} as const;

/**
 * Default empty objects untuk tipe-tipe utama
 */
export const EMPTY_TYPES = {
  ROADMAP: {} as RoadmapData,
  DAY: {} as DayData,
  DAILY_PROGRESS: {} as DailyProgress,
  WEEKLY_PROGRESS: {} as WeeklyProgress,
  MONTHLY_PROGRESS: {} as MonthlyProgress,
  USER_STATISTICS: {} as UserStatistics,
  STUDY_TIME_ANALYTICS: {} as StudyTimeAnalytics,
  COMPLETION_ANALYTICS: {} as CompletionAnalytics,
  QUIZ_ANALYTICS: {} as QuizAnalytics,
  SKILL_ANALYTICS: {} as SkillAnalytics,
  PRODUCTIVITY_ANALYTICS: {} as ProductivityAnalytics,
} as const;
