import { createContext, useContext } from 'react';
import { CategoryRepository } from './CategoryRepository';

export const CategoryContext = createContext<CategoryRepository>(
  new CategoryRepository()
);

function CategoryProvider({ children }: { children: React.ReactNode }) {
  const categoryRepository = useContext(CategoryContext);

  return (
    <CategoryContext.Provider value={categoryRepository}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
