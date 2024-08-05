import { StudyMaterial } from '../../repository/StudyMaterial';

/**
 * Generates a material description for a study material.
 *
 * @param studyMaterial - The study material object.
 * @returns The generated material description.
 */
const generateMaterialDescription = (studyMaterial: StudyMaterial): string => {
  let text: string = '';

  if (studyMaterial.description) {
    text += studyMaterial.description + '. ';
  }

  if (studyMaterial.title) {
    text += 'הכותרת היא: ' + studyMaterial.title + '. ';
  }

  if (studyMaterial.filename) {
    text += 'שם הקובץ: ' + studyMaterial.filename + '. ';
  }

  return (
    'צור תיאור קצר ומובן לקובץ הבא, תוך שימוש במילים מדויקות וביטויים מובנים והבנה ברורה של התוכן. בנוסף, ספק רק את התשובה הסופית. ' +
    'כתוב את הטקסט בעברית: ' +
    text
  );
};

/**
 * Suggests the most appropriate category for a study material based on the provided data.
 *
 * @param studyMaterial - The study material object.
 * @param categories - An array of existing categories.
 * @returns A string representing the suggested category.
 */
const suggestCategory = (studyMaterial: StudyMaterial, categories: string[]): string => {
  let text: string = '';

  if (studyMaterial.description) {
    text += studyMaterial.description + '. ';
  }

  if (studyMaterial.title) {
    text += 'הכותרת היא: ' + studyMaterial.title + '. ';
  }

  if (studyMaterial.filename) {
    text += 'שם הקובץ: ' + studyMaterial.filename + '. ';
  }

  return (
    'בהתבסס על הנתונים הבאים, מהי הקטגוריה המתאימה ביותר לקובץ? תוך שימוש במילים מדויקות וביטויים מובנים והבנה ברורה של התוכן. בנוסף, ספק רק את התשובה הסופית. ' +
    'הקטגוריות הקיימות הן: ' +
    categories.join(', ') +
    '. ' +
    'כתוב את הטקסט בעברית: ' +
    text
  );
};

/**
 * Generates a suggested title based on the given study material.
 *
 * @param studyMaterial - The study material object.
 * @returns The suggested title in Hebrew without quotation marks.
 */
const suggestMaterialTitles = (studyMaterial: StudyMaterial): string => {
  let text: string = '';

  if (studyMaterial.description) {
    text += studyMaterial.description + '. ';
  }

  if (studyMaterial.title) {
    text += 'הכותרת היא: ' + studyMaterial.title + '. ';
  }

  if (studyMaterial.filename) {
    text += 'שם הקובץ: ' + studyMaterial.filename + '. ';
  }

  return (
    ': בהתבסס על הנתונים הבאים, מהי הכותרת המתאימה ביותר לקובץ? בנוסף, ספק רק את הכותרת ללא גרשיים' +
    'כתוב את הכותרת בעברית: ' +
    text
  );
};

export { generateMaterialDescription, suggestCategory, suggestMaterialTitles };
