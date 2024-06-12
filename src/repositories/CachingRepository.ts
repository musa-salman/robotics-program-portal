import { BaseRepository } from './BaseRepository';

export class CachingRepository<T> {
  private readonly BaseRepository: BaseRepository<T>;
  public _cache: Map<string, T> | null;

  constructor(BaseRepository: BaseRepository<T>) {
    this.BaseRepository = BaseRepository;
    this._cache = null;
  }

  async find(): Promise<T[]> {
    if (this._cache !== null) {
      return Array.from(this._cache.values());
    }

    const items = await this.BaseRepository.find();
    items.forEach((item) => {
      this._cache.set((item as any).id, item);
    });

    return items;
  }

  async findOne(id: string): Promise<T | null> {
    if (this._cache !== null) {
      return this._cache.get(id) || null;
    }

    const item = await this.BaseRepository.findOne(id);
    if (item) {
      this._cache.set((item as any).id, item);
    }

    return item;
  }

  async create(item: T): Promise<T> {
    const createdItem = await this.BaseRepository.create(item);
    this._cache.set((createdItem as any).id, createdItem);
    return createdItem;
  }

  async createMany(items: T[]): Promise<T[]> {
    const createdItems = await this.BaseRepository.createMany(items);
    createdItems.forEach((item) => {
      this._cache.set((item as any).id, item);
    });

    return createdItems;
  }

  async update(item: T): Promise<T> {
    const updatedItem = await this.BaseRepository.update(item);
    this._cache.set((updatedItem as any).id, updatedItem);
    return updatedItem;
  }

  refreshCache() {
    this._cache = null;
  }
}
