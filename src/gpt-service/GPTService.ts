import { IGPTService } from './IGPTService';
import Groq from 'groq-sdk';

/**
 * GPTService class that provides methods for generating and manipulating text using GPT models.
 */
export class GPTService implements IGPTService {
  readonly groq: Groq;

  constructor(apiKey: string) {
    this.groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  }

  async generateText(prompt: string): Promise<string[]> {
    return this.groq.chat.completions
      .create({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'llama3-70b-8192'
      })
      .then((response) => {
        return response.choices.map((choice) => choice.message.content || '');
      });
  }

  async simplify(text: string): Promise<string> {
    return this.generateText(
      'שפר את הטקסט הבא ללא הוספת מידע נוסף, וספק רק את התשובה הסופית המשופרת.' + 'כתוב את הטקסט בעברית: ' + text
    ).then((response) => response[0]);
  }

  async makeItShorter(text: string): Promise<string> {
    return this.generateText(
      'קצר את הטקסט הבא ללא הוספת מידע נוסף, וספק רק את התשובה הסופית המקוצרת.' + 'כתוב את הטקסט בעברית: ' + text
    ).then((response) => response[0]);
  }

  async improveText(text: string): Promise<string> {
    return this.generateText(
      'שפר את הטקסט הבא תוך שימור המשמעות המרכזית, השימוש במילים מדויקות וביטויים מובנים, והבנה ברורה של התוכן. בנוסף,  וספק רק את התשובה הסופית.' +
        'כתוב את הטקסט בעברית: ' +
        text
    ).then((response) => response[0]);
  }

  async generateWithInput(data: string): Promise<string> {
    return this.generateText(
      'צור טקסט מבוסס על הנתונים הבאים תוך שימוש במילים מדויקות וביטויים מובנים, והבנה ברורה של התוכן. בנוסף, ספק רק את התשובה הסופית.' +
        'כתוב את הטקסט בעברית: ' +
        data
    ).then((response) => response[0]);
  }
}
