export class Loading {
  queue: string[] = [];

  public setMessage(value: string): number {
    return this.queue.push(value);
  }

  public removeMessage(value: string) {
    const index = this.queue.indexOf(value);

    if (index == -1) {
      throw new Error(`Cannot find key ${value}`);
    }
    
    this.queue.splice(index, 1);
  }
}