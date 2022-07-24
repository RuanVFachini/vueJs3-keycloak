import { StatusCode } from "../../types/status-code.type";

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
