
import { Node } from './index';

export class List<T> implements Iterable<T> {
  private headNode: Node<T>;
  private listSize: Number = 1;

  constructor(headData: T) {
    this.headNode = new Node<T>(headData);
  }

  public [Symbol.iterator](): Iterator<T> {
    throw new Error('Method not implemented.');
  }

  
}