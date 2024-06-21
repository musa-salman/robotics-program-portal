import CacheManager from './CacheManager';

class MissingDocCache<T> extends CacheManager<T> {
  private _cacheManager: CacheManager<T>;
  private _nonExistingDocs: Set<string> = new Set<string>();

  constructor(cacheManager: CacheManager<T>) {
    super();
    this._cacheManager = cacheManager;
  }

  getItem(id: string): T | undefined | null {
    const item = this._cacheManager.getItem(id);

    if (item) {
      return item;
    }

    if (this._nonExistingDocs.has(id)) {
      return null;
    }

    return undefined;
  }
}

export default MissingDocCache;
