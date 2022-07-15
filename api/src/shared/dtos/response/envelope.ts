export enum StatusCode{
  success = 200,
  badRequest = 400,
  internaServerError = 401,
}

interface Error {
  message: string;
  code: StatusCode;
}

export class EnvelopeError<T> {
  items: T[] = [];
  errors: Error[];

  constructor(items: T[], errors: Error[] = []) {
     this.items = items;
     this.errors = errors;
  }
}
