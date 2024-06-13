import { Category } from '../upload-file/Category';

export interface StudyMaterial {
  id: string;
  filename: string;
  category: Category;
  title: string;
  description: string;
  date: Date;
}
