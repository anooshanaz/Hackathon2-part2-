/**
 * Secure localStorage wrapper with SSR safety and type safety
 */

/**
 * Check if localStorage is available (client-side only)
 */
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Get item from localStorage with type safety
 */
export function getStorageItem<T>(key: string): T | null {
  if (!isStorageAvailable()) return null

  try {
    const item = localStorage.getItem(key)
    if (!item) return null
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error)
    return null
  }
}

/**
 * Get string item from localStorage (no JSON parsing)
 */
export function getStorageString(key: string): string | null {
  if (!isStorageAvailable()) return null

  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error)
    return null
  }
}

/**
 * Set item in localStorage with type safety
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (!isStorageAvailable()) return false

  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * Set string item in localStorage (no JSON serialization)
 */
export function setStorageString(key: string, value: string): boolean {
  if (!isStorageAvailable()) return false

  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  if (!isStorageAvailable()) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error)
    return false
  }
}

/**
 * Clear all items from localStorage
 */
export function clearStorage(): boolean {
  if (!isStorageAvailable()) return false

  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}

/**
 * Check if a key exists in localStorage
 */
export function hasStorageItem(key: string): boolean {
  if (!isStorageAvailable()) return false

  try {
    return localStorage.getItem(key) !== null
  } catch {
    return false
  }
}

/**
 * Get all keys from localStorage
 */
export function getStorageKeys(): string[] {
  if (!isStorageAvailable()) return []

  try {
    return Object.keys(localStorage)
  } catch {
    return []
  }
}
