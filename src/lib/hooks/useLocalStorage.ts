import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseLocalStorageOptions {
  /** Apakah data akan di-serialize/deserialize otomatis */
  serialize?: boolean;
  /** Callback ketika data berubah di tab lain */
  onStorageChange?: (key: string, newValue: any) => void;
}

export interface UseLocalStorageReturn<T> {
  /** Nilai yang disimpan */
  value: T | null;
  /** Set nilai ke localStorage */
  setValue: (value: T | ((prev: T | null) => T)) => void;
  /** Hapus data dari localStorage */
  removeValue: () => void;
  /** Cek apakah data ada */
  hasValue: () => boolean;
  /** Reload data dari localStorage */
  reload: () => void;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

/**
 * Hook untuk mengelola localStorage dengan type-safe dan reactivity
 * 
 * @example
 * const { value, setValue, removeValue } = useLocalStorage('user', { name: 'John' });
 * setValue({ name: 'Jane' });
 * removeValue();
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | null = null,
  options: UseLocalStorageOptions = {}
): UseLocalStorageReturn<T> {
  const { serialize = true, onStorageChange } = options;
  const [value, setValueState] = useState<T | null>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isInitialMount = useRef(true);
  const isUpdatingFromStorage = useRef(false);

  /**
   * Ambil data dari localStorage
   */
  const getStorageValue = useCallback((): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      if (!serialize) return item as unknown as T;
      return JSON.parse(item);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to parse localStorage data'));
      return null;
    }
  }, [key, serialize]);

  /**
   * Simpan data ke localStorage
   */
  const setStorageValue = useCallback((newValue: T | null): void => {
    try {
      if (newValue === null || newValue === undefined) {
        localStorage.removeItem(key);
      } else {
        const valueToStore = serialize ? JSON.stringify(newValue) : String(newValue);
        localStorage.setItem(key, valueToStore);
      }
      setValueState(newValue);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save to localStorage'));
    }
  }, [key, serialize]);

  /**
   * Set value dengan update state dan localStorage
   */
  const setValue = useCallback((valueOrFn: T | ((prev: T | null) => T)): void => {
    const newValue = typeof valueOrFn === 'function'
      ? (valueOrFn as (prev: T | null) => T)(value)
      : valueOrFn;
    setStorageValue(newValue);
  }, [value, setStorageValue]);

  /**
   * Hapus data dari localStorage
   */
  const removeValue = useCallback((): void => {
    try {
      localStorage.removeItem(key);
      setValueState(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove from localStorage'));
    }
  }, [key]);

  /**
   * Cek apakah data ada di localStorage
   */
  const hasValue = useCallback((): boolean => {
    return localStorage.getItem(key) !== null;
  }, [key]);

  /**
   * Reload data dari localStorage
   */
  const reload = useCallback((): void => {
    setIsLoading(true);
    try {
      const stored = getStorageValue();
      setValueState(stored);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to reload localStorage'));
    } finally {
      setIsLoading(false);
    }
  }, [getStorageValue]);

  /**
   * Sync data antar tab
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent): void => {
      if (event.key === key) {
        isUpdatingFromStorage.current = true;
        try {
          const newValue = event.newValue;
          if (newValue === null) {
            setValueState(null);
          } else {
            const parsed = serialize ? JSON.parse(newValue) : newValue;
            setValueState(parsed);
          }
          setError(null);
          onStorageChange?.(key, newValue);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to parse storage change'));
        } finally {
          isUpdatingFromStorage.current = false;
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, serialize, onStorageChange]);

  /**
   * Load initial value
   */
  useEffect(() => {
    if (isInitialMount.current) {
      const stored = getStorageValue();
      setValueState(stored !== null ? stored : initialValue);
      setIsLoading(false);
      isInitialMount.current = false;
    }
  }, [getStorageValue, initialValue]);

  return {
    value,
    setValue,
    removeValue,
    hasValue,
    reload,
    isLoading,
    error,
  };
}

/**
 * Hook untuk multiple localStorage keys
 */
export function useMultipleLocalStorage<T extends Record<string, any>>(
  keys: string[],
  initialValues?: T
): {
  values: T;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  removeValue: (key: string) => void;
  hasValue: (key: string) => boolean;
  reloadAll: () => void;
  isLoading: boolean;
  error: Error | null;
} {
  const [values, setValues] = useState<T>({} as T);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadAll = useCallback(() => {
    setIsLoading(true);
    try {
      const loaded = {} as T;
      keys.forEach((key) => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            loaded[key as keyof T] = JSON.parse(item);
          } catch {
            loaded[key as keyof T] = item as T[keyof T];
          }
        } else if (initialValues && key in initialValues) {
          loaded[key as keyof T] = initialValues[key as keyof T];
        }
      });
      setValues(loaded);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load multiple localStorage'));
    } finally {
      setIsLoading(false);
    }
  }, [keys, initialValues]);

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    try {
      localStorage.setItem(key as string, JSON.stringify(value));
      setValues((prev) => ({ ...prev, [key]: value }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to save ${String(key)} to localStorage`));
    }
  }, []);

  const removeValue = useCallback((key: string) => {
    try {
      localStorage.removeItem(key);
      setValues((prev) => {
        const newValues = { ...prev };
        delete newValues[key as keyof T];
        return newValues;
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to remove ${key} from localStorage`));
    }
  }, []);

  const hasValue = useCallback((key: string): boolean => {
    return localStorage.getItem(key) !== null;
  }, []);

  const reloadAll = useCallback(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    values,
    setValue,
    removeValue,
    hasValue,
    reloadAll,
    isLoading,
    error,
  };
}

/**
 * Hook untuk localStorage dengan expired time
 */
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T | null = null,
  expiryMs: number = 24 * 60 * 60 * 1000 // 1 hari default
): UseLocalStorageReturn<T> & { isExpired: boolean; getTimeRemaining: () => number } {
  const [isExpired, setIsExpired] = useState(false);

  const getExpiry = useCallback((): number | null => {
    try {
      const expiry = localStorage.getItem(`${key}_expiry`);
      return expiry ? parseInt(expiry, 10) : null;
    } catch {
      return null;
    }
  }, [key]);

  const setExpiry = useCallback(() => {
    try {
      localStorage.setItem(`${key}_expiry`, String(Date.now() + expiryMs));
    } catch {
      // silent fail
    }
  }, [key, expiryMs]);

  const isDataExpired = useCallback((): boolean => {
    const expiry = getExpiry();
    if (!expiry) return false;
    return Date.now() > expiry;
  }, [getExpiry]);

  const getTimeRemaining = useCallback((): number => {
    const expiry = getExpiry();
    if (!expiry) return 0;
    return Math.max(0, expiry - Date.now());
  }, [getExpiry]);

  const { value, setValue, removeValue, hasValue, reload, isLoading, error } = useLocalStorage<T>(
    key,
    initialValue,
    {
      onStorageChange: () => {
        setIsExpired(isDataExpired());
      },
    }
  );

  // Override setValue untuk menambahkan expiry
  const setValueWithExpiry = useCallback((valueOrFn: T | ((prev: T | null) => T)) => {
    const newValue = typeof valueOrFn === 'function'
      ? (valueOrFn as (prev: T | null) => T)(value)
      : valueOrFn;
    setValue(newValue);
    setExpiry();
    setIsExpired(false);
  }, [value, setValue, setExpiry]);

  // Override removeValue untuk menghapus expiry juga
  const removeValueWithExpiry = useCallback(() => {
    removeValue();
    try {
      localStorage.removeItem(`${key}_expiry`);
    } catch {
      // silent fail
    }
    setIsExpired(false);
  }, [removeValue, key]);

  // Check expiry on load
  useEffect(() => {
    if (value !== null && isDataExpired()) {
      setIsExpired(true);
      removeValueWithExpiry();
    }
  }, [value, isDataExpired, removeValueWithExpiry]);

  return {
    value,
    setValue: setValueWithExpiry,
    removeValue: removeValueWithExpiry,
    hasValue,
    reload,
    isLoading,
    error,
    isExpired,
    getTimeRemaining,
  };
}

/**
 * Hook untuk localStorage dengan validation
 */
export function useLocalStorageWithValidation<T>(
  key: string,
  initialValue: T | null = null,
  validate: (value: T) => boolean
): UseLocalStorageReturn<T> & { isValid: boolean; validationError: string | null } {
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateValue = useCallback((value: T | null): boolean => {
    if (value === null) return true;
    try {
      const result = validate(value);
      setIsValid(result);
      setValidationError(result ? null : 'Validasi gagal');
      return result;
    } catch (err) {
      setIsValid(false);
      setValidationError(err instanceof Error ? err.message : 'Validasi error');
      return false;
    }
  }, [validate]);

  const { value, setValue, removeValue, hasValue, reload, isLoading, error } = useLocalStorage<T>(
    key,
    initialValue,
    {
      onStorageChange: () => {
        if (value !== null) validateValue(value);
      },
    }
  );

  const setValueWithValidation = useCallback((valueOrFn: T | ((prev: T | null) => T)) => {
    const newValue = typeof valueOrFn === 'function'
      ? (valueOrFn as (prev: T | null) => T)(value)
      : valueOrFn;
    if (newValue !== null && !validateValue(newValue)) {
      return;
    }
    setValue(newValue);
  }, [value, setValue, validateValue]);

  // Validate initial value
  useEffect(() => {
    if (value !== null) {
      validateValue(value);
    }
  }, [value, validateValue]);

  return {
    value,
    setValue: setValueWithValidation,
    removeValue,
    hasValue,
    reload,
    isLoading,
    error,
    isValid,
    validationError,
  };
}

export default useLocalStorage;
