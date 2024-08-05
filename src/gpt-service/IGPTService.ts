/**
 * Interface for a service that interacts with a GPT (Generative Pre-trained Transformer) model.
 */
export interface IGPTService {
  /**
   * Generates text based on a given prompt.
   * @param {string} prompt - The input prompt to generate text from.
   * @returns {Promise<string[]>} A promise that resolves to an array of generated text strings.
   */
  generateText(prompt: string): Promise<string[]>;

  /**
   * Simplifies the given text.
   * @param {string} text - The text to simplify.
   * @returns {Promise<string>} A promise that resolves to the simplified text.
   */
  simplify(text: string): Promise<string>;

  /**
   * Makes the given text shorter.
   * @param {string} text - The text to shorten.
   * @returns {Promise<string>} A promise that resolves to the shortened text.
   */
  makeItShorter(text: string): Promise<string>;

  /**
   * Improves the given text.
   * @param {string} text - The text to improve.
   * @returns {Promise<string>} A promise that resolves to the improved text.
   */
  improveText(text: string): Promise<string>;

  /**
   * Generates text based on the given input data.
   * @param {string} data - The input data to generate text from.
   * @returns {Promise<string>} A promise that resolves to the generated text.
   */
  generateWithInput(data: string): Promise<string>;
}
