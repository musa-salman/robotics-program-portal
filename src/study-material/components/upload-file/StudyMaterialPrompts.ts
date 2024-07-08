import { StudyMaterial } from '../../repository/StudyMaterial';

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
