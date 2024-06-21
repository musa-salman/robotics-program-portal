const isHebrewOnly = (text: string | undefined): boolean => {
  if (text == undefined) {
    return false;
  }
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  return hebrewRegex.test(text);
};

export { isHebrewOnly };
