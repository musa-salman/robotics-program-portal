/**
 * Checks if the given text contains only Hebrew characters.
 *
 * @param text - The text to be validated.
 * @returns A boolean indicating whether the text contains only Hebrew characters.
 */
const isHebrewOnly = (text: string | undefined): boolean => {
  if (text == undefined) {
    return false;
  }
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  return hebrewRegex.test(text);
};

export { isHebrewOnly };
