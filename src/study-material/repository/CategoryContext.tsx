import { createContext, useContext } from 'react';
import { CategoryRepository } from './CategoryRepository';

/**
 * Represents the context for managing categories in the study material repository.
 */
export const CategoryContext = createContext<CategoryRepository>(new CategoryRepository());

/**
 * Provides the category repository to its children components.
 *
 * @param children - The child components to render.
 */
function CategoryProvider({ children }: { children: React.ReactNode }) {
  const categoryRepository = useContext(CategoryContext);

  return <CategoryContext.Provider value={categoryRepository}>{children}</CategoryContext.Provider>;
}

export default CategoryProvider;
