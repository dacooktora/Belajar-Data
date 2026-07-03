export function getDayId(month: number, week: number, day: number): number {
  const daysBeforeMonth = (month - 1) * 30;
  const daysBeforeWeek = (week - 1) * 7;
  return daysBeforeMonth + daysBeforeWeek + day;
}

export function getMonthFromDayId(dayId: number): number {
  return Math.ceil(dayId / 30);
}

export function getWeekFromDayId(dayId: number): number {
  const month = getMonthFromDayId(dayId);
  const dayInMonth = dayId - (month - 1) * 30;
  return Math.ceil(dayInMonth / 7);
}

export function getDayInMonthFromDayId(dayId: number): number {
  const month = getMonthFromDayId(dayId);
  return dayId - (month - 1) * 30;
}

export function formatDayLabel(dayId: number): string {
  const month = getMonthFromDayId(dayId);
  const dayInMonth = getDayInMonthFromDayId(dayId);
  return `Hari ke-${dayId} (Bulan ${month}, Hari ${dayInMonth})`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 0) return '0 menit';
  if (minutes < 60) return `${minutes} menit`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} jam`;
  return `${hours} jam ${remainingMinutes} menit`;
}

export function formatDurationShort(minutes: number): string {
  if (minutes < 0) return '0m';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}j`;
  return `${hours}j ${remainingMinutes}m`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatCurrency(value: number, currency: string = 'Rp'): string {
  return `${currency} ${formatNumber(value)}`;
}

export function calculateCompletion(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

export function calculateStandardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = calculateAverage(values);
  const squaredDifferences = values.map(v => Math.pow(v - mean, 2));
  const variance = calculateAverage(squaredDifferences);
  return Math.sqrt(variance);
}

export function calculateTrend(values: number[]): 'up' | 'down' | 'stable' {
  if (values.length < 2) return 'stable';
  const first = values[0];
  const last = values[values.length - 1];
  const diff = last - first;
  const threshold = Math.abs(first) * 0.05;
  if (diff > threshold) return 'up';
  if (diff < -threshold) return 'down';
  return 'stable';
}

export function calculateStreak(dates: string[]): { current: number; longest: number } {
  if (dates.length === 0) return { current: 0, longest: 0 };
  const sortedDates = [...dates].sort();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneDayMs = 24 * 60 * 60 * 1000;

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i]);
    const next = new Date(sortedDates[i + 1]);
    const diffDays = (next.getTime() - current.getTime()) / oneDayMs;
    if (diffDays === 1) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 1;
    }
  }
  if (tempStreak > longestStreak) longestStreak = tempStreak;

  const lastDate = new Date(sortedDates[sortedDates.length - 1]);
  const diffToday = (today.getTime() - lastDate.getTime()) / oneDayMs;

  if (diffToday === 0) {
    currentStreak = 1;
    for (let i = sortedDates.length - 2; i >= 0; i--) {
      const prev = new Date(sortedDates[i]);
      const next = new Date(sortedDates[i + 1]);
      const diff = (next.getTime() - prev.getTime()) / oneDayMs;
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { current: currentStreak, longest: longestStreak };
}

export function getDaysBetweenDates(start: Date, end: Date): number {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / oneDayMs);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();
}

export function isDateInRange(date: Date | string, start: Date | string, end: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const s = typeof start === 'string' ? new Date(start) : start;
  const e = typeof end === 'string' ? new Date(end) : end;
  return d >= s && d <= e;
}

export function getCurrentDayId(): number {
  const startDate = new Date();
  const endDate = addDays(startDate, 180);
  const today = new Date();
  const diffDays = getDaysBetweenDates(startDate, today);
  return Math.min(Math.max(diffDays + 1, 1), 180);
}

export function getDayIdFromDate(date: Date, startDate: Date): number {
  const diff = getDaysBetweenDates(startDate, date);
  return Math.min(Math.max(diff + 1, 1), 180);
}

export function getStartDateFromDayId(dayId: number, startDate: Date): Date {
  return addDays(startDate, dayId - 1);
}

export function getEndDateFromDayId(dayId: number, startDate: Date): Date {
  return addDays(startDate, dayId);
}

export function getWeekNumber(dayId: number): number {
  return getWeekFromDayId(dayId);
}

export function getMonthNumber(dayId: number): number {
  return getMonthFromDayId(dayId);
}

export function getYearNumber(dayId: number, startDate: Date): number {
  const date = getStartDateFromDayId(dayId, startDate);
  return date.getFullYear();
}

export function getWeekStartDate(week: number, month: number, startDate: Date): Date {
  const dayId = (month - 1) * 30 + (week - 1) * 7 + 1;
  return getStartDateFromDayId(dayId, startDate);
}

export function getWeekEndDate(week: number, month: number, startDate: Date): Date {
  const dayId = (month - 1) * 30 + (week - 1) * 7 + 7;
  return getStartDateFromDayId(dayId, startDate);
}

export function getMonthStartDate(month: number, startDate: Date): Date {
  const dayId = (month - 1) * 30 + 1;
  return getStartDateFromDayId(dayId, startDate);
}

export function getMonthEndDate(month: number, startDate: Date): Date {
  const dayId = month * 30;
  return getStartDateFromDayId(dayId, startDate);
}

export function getMonthDays(month: number, startDate: Date): number {
  const start = getMonthStartDate(month, startDate);
  const end = getMonthEndDate(month, startDate);
  return getDaysBetweenDates(start, end) + 1;
}

export function getWeekDays(week: number, month: number, startDate: Date): number {
  const start = getWeekStartDate(week, month, startDate);
  const end = getWeekEndDate(week, month, startDate);
  return getDaysBetweenDates(start, end) + 1;
}

export function getDayOfWeek(dayId: number, startDate: Date): number {
  const date = getStartDateFromDayId(dayId, startDate);
  return date.getDay();
}

export function getDayName(dayId: number, startDate: Date): string {
  const date = getStartDateFromDayId(dayId, startDate);
  return date.toLocaleDateString('id-ID', { weekday: 'long' });
}

export function getMonthName(month: number): string {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return months[month - 1] || '';
}

export function getShortMonthName(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return months[month - 1] || '';
}

export function getDaySuffix(day: number): string {
  if (day === 1 || day === 21 || day === 31) return 'st';
  if (day === 2 || day === 22) return 'nd';
  if (day === 3 || day === 23) return 'rd';
  return 'th';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeWords(text: string): string {
  if (!text) return '';
  return text.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, ascending: boolean = true): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
}

export function filterBy<T>(array: T[], key: keyof T, value: any): T[] {
  return array.filter(item => item[key] === value);
}

export function searchBy<T>(array: T[], searchTerm: string, keys: (keyof T)[]): T[] {
  const term = searchTerm.toLowerCase();
  return array.filter(item =>
    keys.some(key =>
      String(item[key]).toLowerCase().includes(term)
    )
  );
}

export function getUniqueValues<T>(array: T[], key: keyof T): T[keyof T][] {
  return [...new Set(array.map(item => item[key]))];
}

export function getValueByPath(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  return current;
}

export function setValueByPath(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key] as any;
    }
  }
  return result;
}

export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isUndefined(value: any): value is undefined {
  return value === undefined;
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (isString(value)) return value.trim() === '';
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}

export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;
  return phoneRegex.test(phone);
}

export function parseJsonSafe(json: string): any {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function stringifyJsonSafe(obj: any): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return '';
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();
  return function(...args: Parameters<T>) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = func(...args);
    cache.set(key, result);
    return result;
  } as T;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

export function getPercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function floorTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
}

export function ceilTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.ceil(value * factor) / factor;
}

export function sumArray(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

export function productArray(values: number[]): number {
  return values.reduce((a, b) => a * b, 1);
}

export function minArray(values: number[]): number {
  return Math.min(...values);
}

export function maxArray(values: number[]): number {
  return Math.max(...values);
}

export function rangeArray(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function flattenArray<T>(array: T[][]): T[] {
  return array.reduce((acc, val) => acc.concat(val), []);
}

export function intersectionArray<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(value => array2.includes(value));
}

export function differenceArray<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(value => !array2.includes(value));
}

export function unionArray<T>(array1: T[], array2: T[]): T[] {
  return uniqueArray([...array1, ...array2]);
}

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, word => capitalizeFirstLetter(word));
}

export function getFileNameFromUrl(url: string): string {
  return url.split('/').pop() || '';
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop() || '';
}

export function getFileType(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase();
  const types: Record<string, string> = {
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'svg': 'image',
    'webp': 'image',
    'mp4': 'video',
    'avi': 'video',
    'mov': 'video',
    'mkv': 'video',
    'pdf': 'document',
    'doc': 'document',
    'docx': 'document',
    'xls': 'document',
    'xlsx': 'document',
    'ppt': 'document',
    'pptx': 'document',
    'txt': 'text',
    'csv': 'text',
    'json': 'data',
    'xml': 'data',
    'zip': 'archive',
    'rar': 'archive',
    '7z': 'archive'
  };
  return types[ext] || 'unknown';
}

export function isImageFile(filename: string): boolean {
  return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(getFileExtension(filename).toLowerCase());
}

export function isVideoFile(filename: string): boolean {
  return ['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(getFileExtension(filename).toLowerCase());
}

export function isDocumentFile(filename: string): boolean {
  return ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(getFileExtension(filename).toLowerCase());
}

export function isSpreadsheetFile(filename: string): boolean {
  return ['xls', 'xlsx', 'csv', 'ods'].includes(getFileExtension(filename).toLowerCase());
}

export function getFileIcon(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase();
  const icons: Record<string, string> = {
    'xlsx': '📊',
    'xls': '📊',
    'csv': '📈',
    'pdf': '📄',
    'doc': '📃',
    'docx': '📃',
    'ppt': '📽️',
    'pptx': '📽️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'mp4': '🎬',
    'avi': '🎬',
    'mov': '🎬',
    'txt': '📝',
    'json': '📋',
    'xml': '📋',
    'zip': '📦',
    'rar': '📦',
    '7z': '📦'
  };
  return icons[ext] || '📎';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'not_started': 'gray',
    'in_progress': 'blue',
    'completed': 'green',
    'reviewing': 'yellow',
    'mastered': 'purple',
    'passed': 'green',
    'failed': 'red',
    'pending': 'yellow',
    'skipped': 'gray',
    'submitted': 'blue',
    'accepted': 'green',
    'rejected': 'red'
  };
  return colors[status] || 'gray';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'not_started': 'Belum Dimulai',
    'in_progress': 'Sedang Berlangsung',
    'completed': 'Selesai',
    'reviewing': 'Sedang Ditinjau',
    'mastered': 'Dikuasai',
    'passed': 'Lulus',
    'failed': 'Gagal',
    'pending': 'Menunggu',
    'skipped': 'Dilewati',
    'submitted': 'Dikirim',
    'accepted': 'Diterima',
    'rejected': 'Ditolak'
  };
  return labels[status] || status;
}

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    'beginner': 'Pemula',
    'intermediate': 'Menengah',
    'advanced': 'Lanjutan',
    'expert': 'Expert'
  };
  return labels[difficulty] || difficulty;
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    'beginner': 'green',
    'intermediate': 'yellow',
    'advanced': 'orange',
    'expert': 'red'
  };
  return colors[difficulty] || 'gray';
}

export function getLanguageFlag(language: string): string {
  const flags: Record<string, string> = {
    'Indonesia': '🇮🇩',
    'Inggris': '🇬🇧',
    'Lainnya': '🌍'
  };
  return flags[language] || '🌍';
}
