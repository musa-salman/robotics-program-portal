import { DocumentData, DocumentReference } from 'firebase/firestore';
import { BaseRepository } from '../BaseRepository';

export class CachingRepository<T> extends BaseRepository<T> {
  private readonly repositoryBase: BaseRepository<T>;
  public _cache: Map<string, T> | null;

  constructor(repositoryBase: BaseRepository<T>) {
    super(repositoryBase._collection.firestore, repositoryBase._collection.path);
    this.repositoryBase = repositoryBase;
    this._cache = null;
  }

  async find(): Promise<T[]> {
    if (this._cache !== null) {
      return Array.from(this._cache.values());
    }

    const items = await this.repositoryBase.find();
    this._cache = new Map<string, T>();

    items.forEach((item) => {
      this._cache!.set((item as any).id, item);
    });

    return items;
  }

  async findOne(id: string): Promise<T | null> {
    if (this._cache !== null) {
      console.log(this._cache);
      if (this._cache.has(id)) {
        return this._cache.get(id) ?? null;
      }

      return this.repositoryBase.findOne(id).then((item) => {
        if (item) this._cache!.set((item as any).id, item);
        return item;
      });
    }

    const item = await this.repositoryBase.findOne(id);
    this._cache = new Map<string, T>();
    if (item) {
      this._cache!.set((item as any).id, item);
    }

    return item;
  }

  async create(item: T): Promise<DocumentReference<T, DocumentData>> {
    const createdItem = await this.repositoryBase.create(item);

    if (this._cache === null) {
      this._cache = new Map<string, T>();
    }

    this._cache.set((createdItem as any).id, item);
    return createdItem;
  }

  async createMany(items: T[]): Promise<DocumentReference<T, DocumentData>[]> {
    const createdItems = await this.repositoryBase.createMany(items);

    if (this._cache === null) {
      this._cache = new Map<string, T>();
    }

    items.forEach((item, index) => {
      this._cache!.set((createdItems[index] as any).id, item);
    });

    return createdItems;
  }

  async update(id: string, item: T): Promise<void> {
    this.repositoryBase.update(id, item).then(() => {
      if (this._cache !== null) {
        this._cache.set(id, item);
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.repositoryBase.delete(id).then(() => {
      if (this._cache !== null) {
        this._cache.delete(id);
      }
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    this.repositoryBase.deleteMany(ids).then(() => {
      if (this._cache !== null) {
        ids.forEach((id) => {
          this._cache!.delete(id);
        });
      }
    });
  }

  async deleteAll(): Promise<void> {
    this.repositoryBase.deleteAll().then(() => {
      if (this._cache !== null) {
        this._cache.clear();
      }
    });
  }

  invalidateCache() {
    this._cache = null;
  }
}
