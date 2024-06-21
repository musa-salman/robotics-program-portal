import { DocumentData, DocumentReference } from 'firebase/firestore';
import { BaseRepository } from '../BaseRepository';
import ICacheManager from './ICacheManager';
import CacheManager from './CacheManager';

export class CachingRepository<T> extends BaseRepository<T> {
  private readonly repositoryBase: BaseRepository<T>;
  private cacheManager: ICacheManager<T>;

  constructor(repositoryBase: BaseRepository<T>, cacheManager?: ICacheManager<T>) {
    super(repositoryBase._collection.firestore, repositoryBase._collection.path);
    this.repositoryBase = repositoryBase;
    this.cacheManager = cacheManager || new CacheManager<T>();
  }

  async find(): Promise<T[]> {
    if (this.cacheManager.hasCache()) {
      return this.cacheManager.cacheValues();
    }

    const items = await this.repositoryBase.find();
    this.cacheManager.initialize();

    items.forEach((item) => {
      this.cacheManager.setItem((item as any).id, item);
    });

    return items;
  }

  async findOne(id: string): Promise<T | null> {
    if (this.cacheManager.hasCache()) {
      const cachedItem = this.cacheManager.getItem(id);
      if (cachedItem) {
        return cachedItem;
      }

      const item = await this.repositoryBase.findOne(id);
      if (item) {
        this.cacheManager.setItem((item as any).id, item);
      }
      return item;
    }

    const item = await this.repositoryBase.findOne(id);
    this.cacheManager.initialize();
    if (item) {
      this.cacheManager.setItem((item as any).id, item);
    }

    return item;
  }

  async create(item: T): Promise<DocumentReference<T, DocumentData>> {
    const createdItem = await this.repositoryBase.create(item);
    this.cacheManager.initialize();
    this.cacheManager.setItem((createdItem as any).id, item);
    return createdItem;
  }

  async createMany(items: T[]): Promise<DocumentReference<T, DocumentData>[]> {
    const createdItems = await this.repositoryBase.createMany(items);
    this.cacheManager.initialize();

    items.forEach((item, index) => {
      this.cacheManager.setItem((createdItems[index] as any).id, item);
    });

    return createdItems;
  }

  async update(id: string, item: T): Promise<void> {
    await this.repositoryBase.update(id, item);
    if (this.cacheManager.hasCache()) {
      this.cacheManager.setItem(id, item);
    }
  }

  async delete(id: string): Promise<void> {
    await this.repositoryBase.delete(id);
    if (this.cacheManager.hasCache()) {
      this.cacheManager.deleteItem(id);
    }
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.repositoryBase.deleteMany(ids);
    if (this.cacheManager.hasCache()) {
      ids.forEach((id) => {
        this.cacheManager.deleteItem(id);
      });
    }
  }

  async deleteAll(): Promise<void> {
    await this.repositoryBase.deleteAll();
    if (this.cacheManager.hasCache()) {
      this.cacheManager.flush();
    }
  }

  invalidateCache() {
    this.cacheManager.flush();
  }
}
