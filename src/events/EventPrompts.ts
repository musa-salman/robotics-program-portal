import { IEvent } from './repository/Event';

const generateEventDescription = (event: IEvent): string => {
  let text: string = '';

  if (event.details) {
    text += event.details + '. ';
  }

  if (event.title) {
    text += 'הכותרת היא: ' + event.title + '. ';
  }

  return (
    'צור תיאור קצר ומובן לקובץ הבא, תוך שימוש במילים מדויקות וביטויים מובנים והבנה ברורה של התוכן. בנוסף, ספק רק את התשובה הסופית. ' +
    'כתוב את הטקסט בעברית: ' +
    text
  );
};

const suggestEventTitles = (event: IEvent): string => {
  let text: string = '';

  if (event.details) {
    text += event.details + '. ';
  }

  if (event.title) {
    text += 'הכותרת היא: ' + event.title + '. ';
  }

  return (
    ': בהתבסס על הנתונים הבאים, מהי הכותרת המתאימה ביותר לקובץ? בנוסף, ספק רק את הכותרת ללא גרשיים' +
    'כתוב את הכותרת בעברית: ' +
    text
  );
};

export { generateEventDescription, suggestEventTitles };
