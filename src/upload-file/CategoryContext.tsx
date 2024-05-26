import { createContext } from 'react';
import { CategoryRepository } from './CategoryRepository';

export const CategoryContext = createContext<CategoryRepository | null>(null);

function CategoryProvider({ children } : { children: React.ReactNode }) {
  const categoryRepository = new CategoryRepository();

  return (
    <CategoryContext.Provider value={categoryRepository}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;