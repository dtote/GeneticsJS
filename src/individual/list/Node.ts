
export class Node<T> {
  private nodeData: T;
  private nextNode: Node<T> | null = null;

  constructor(data: T) {
    this.nodeData = data;
  }

  get data(): T {
    return this.nodeData;
  }

  set data(newData: T) {
    this.nodeData = newData;
  }

  get next(): Node<T> | null {
    return this.nextNode;
  }

  set next(nextNode: Node<T> | null) {
    this.nextNode = nextNode;
  }
}