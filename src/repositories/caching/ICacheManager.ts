/**
 * Represents a cache manager interface.
 * @template T - The type of items stored in the cache.
 */
interface ICacheManager<T> {
  /**
   * Initializes the cache manager.
   */
  initialize(): void;
  getCache(): Map<string, T> | null;
  getItem(id: string): T | undefined | null;
  setItem(id: string, item: T): void;
  deleteItem(id: string): void;
  flush(): void;
  hasCache(): boolean;
  cacheValues(): T[];
}

export default ICacheManager;
