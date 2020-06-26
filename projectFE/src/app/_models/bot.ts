export class bot {
    constructor(
      public lang: string,
      public type: number,
      public speech: string,
      public platform: string,
      public replies: Array<string>,
      public textToSpeech: string) { }
  }