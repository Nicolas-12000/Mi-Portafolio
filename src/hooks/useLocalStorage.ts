import { useState } from 'react';
import { isClient } from '@/lib/utils';

/**
 * Hook para persistir estado en localStorage
 * @param key - Clave de localStorage
 * @param initialValue - Valor inicial
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Estado inicial: intentar leer de localStorage, sino usar initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el estado y localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
