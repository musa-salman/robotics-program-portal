import { MockRepository } from '../repositories/MockRepository';
import { Category } from './Category';
import { ICategoryRepository } from './CategoryRepository';

export class MockCategoryRepository extends MockRepository<Category> implements ICategoryRepository {
  constructor() {
    super();
    super.create({ category: 'הרצאות' });
    super.create({ category: '1הרצאות' });
    super.create({ category: '2הרצאות' });
    super.create({ category: '3הרצאות' });
    super.create({ category: '4הרצאות' });
    super.create({ category: '5הרצאות' });
  }
}
