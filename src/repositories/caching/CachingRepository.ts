import { DocumentData, DocumentReference } from 'firebase/firestore';
import { BaseRepository } from '../BaseRepository';
import ICacheManager from './ICacheManager';
import CacheManager from './CacheManager';

export class CachingRepository<T> extends BaseRepository<T> {
  private readonly repositoryBase: BaseRepository<T>;
  private cacheManager: ICacheManager<T>;
  private isCacheFullyPopulated = false;

  constructor(repositoryBase: BaseRepository<T>, cacheManager?: ICacheManager<T>) {
    super(repositoryBase._collection.firestore, repositoryBase._collection.path);
    this.repositoryBase = repositoryBase;
    this.cacheManager = cacheManager || new CacheManager<T>();
  }

  find(): Promise<T[]> {
    if (this.isCacheFullyPopulated && this.cacheManager.hasCache()) {
      return Promise.resolve(this.cacheManager.cacheValues());
    }

    return this.repositoryBase.find().then((items) => {
      if (!this.cacheManager.hasCache()) {
        this.cacheManager.initialize();
      }

      this.isCacheFullyPopulated = true;

      items.forEach((item) => {
        this.cacheManager.setItem((item as any).id, item);
      });

      return items;
    });
  }

  findOne(id: string): Promise<T | null> {
    if (this.cacheManager.hasCache()) {
      const cachedItem = this.cacheManager.getItem(id);
      if (cachedItem) {
        return Promise.resolve(cachedItem);
      }

      return this.repositoryBase.findOne(id).then((item) => {
        if (item) {
          this.cacheManager.setItem((item as any).id, item);
        }
        return item;
      });
    }

    return this.repositoryBase.findOne(id).then((item) => {
      this.cacheManager.initialize();
      if (item) {
        this.cacheManager.setItem((item as any).id, item);
      }

      return item;
    });
  }

  create(item: T): Promise<DocumentReference<T, DocumentData>> {
    return this.repositoryBase.create(item).then((createdItem) => {
      if (!this.cacheManager.hasCache()) {
        this.cacheManager.initialize();
      }
      this.cacheManager.setItem((createdItem as any).id, item);
      return createdItem;
    });
  }

  createMany(items: T[]): Promise<DocumentReference<T, DocumentData>[]> {
    return this.repositoryBase.createMany(items).then((createdItems) => {
      if (!this.cacheManager.hasCache()) {
        this.cacheManager.initialize();
      }

      items.forEach((item, index) => {
        this.cacheManager.setItem((createdItems[index] as any).id, item);
      });

      return createdItems;
    });
  }

  update(id: string, item: T): Promise<void> {
    return this.repositoryBase.update(id, item).then(() => {
      if (!this.cacheManager.hasCache()) {
        this.cacheManager.initialize();
      }

      this.cacheManager.setItem(id, item);
    });
  }

  delete(id: string): Promise<void> {
    return this.repositoryBase.delete(id).then(() => {
      if (this.cacheManager.hasCache()) {
        this.cacheManager.deleteItem(id);
      }
    });
  }

  deleteMany(ids: string[]): Promise<void> {
    return this.repositoryBase.deleteMany(ids).then(() => {
      if (this.cacheManager.hasCache()) {
        ids.forEach((id) => {
          this.cacheManager.deleteItem(id);
        });
      }
    });
  }

  deleteAll(): Promise<void> {
    return this.repositoryBase.deleteAll().then(() => {
      if (this.cacheManager.hasCache()) {
        this.cacheManager.flush();
      }
    });
  }

  invalidateCache() {
    this.cacheManager.flush();
  }
}
