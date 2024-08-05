/**
 * Represents a study material.
 *
 * @remarks
 * This interface defines the structure of a study material object.
 */
export interface StudyMaterial {
  id: string;
  filename: string;
  category: string;
  title: string;
  description: string;
  date: Date;
}
