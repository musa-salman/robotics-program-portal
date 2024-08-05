import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { Category } from './Category';

/**
 * Represents a repository for managing categories.
 */
export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(db, 'categories');
  }
}
