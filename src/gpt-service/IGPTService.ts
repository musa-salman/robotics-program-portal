export interface IGPTService {
  generateText(prompt: string): Promise<string>;

  simplify(text: string): Promise<string>;

  makeItShorter(text: string): Promise<string>;

  improveText(text: string): Promise<string>;

  generateWithInput(data: string): Promise<string>;
}
