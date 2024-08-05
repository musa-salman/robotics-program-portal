import ICacheManager from './ICacheManager';

/**
 * CacheManager class for managing a cache of items.
 * @template T - The type of items stored in the cache.
 */
class CacheManager<T> implements ICacheManager<T> {
  private _cache: Map<string, T> | null = null;

  initialize() {
    if (this._cache === null) {
      this._cache = new Map<string, T>();
    }
  }

  getCache(): Map<string, T> | null {
    return this._cache;
  }

  getItem(id: string): T | undefined | null {
    return this._cache?.get(id) ?? null;
  }

  setItem(id: string, item: T): void {
    this._cache?.set(id, item);
  }

  deleteItem(id: string): void {
    this._cache?.delete(id);
  }

  flush(): void {
    this._cache = null;
  }

  hasCache(): boolean {
    return this._cache !== null;
  }

  cacheValues(): T[] {
    return this._cache ? Array.from(this._cache.values()) : [];
  }
}

export default CacheManager;
