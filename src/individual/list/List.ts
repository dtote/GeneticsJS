
import { Node } from './index';

type nodeConditionCallback<T> = (nodeData: T) => boolean;
type nodeCallback<T> = (nodeData: T) => any;

export class List<T> implements Iterable<T> {
  private headNode: Node<T> | null;
  private listSize: number;

  constructor(headData?: T) {
    if (headData) {
      this.headNode = new Node<T>(headData);
      this.listSize = 1;
    } else {
      this.headNode = null;
      this.listSize = 0;
    }
  }

  get front(): T | null {
    if (this.headNode) {
      return this.headNode.data;
    }
    return null;
  }

  get back(): T | null {
    if (this.headNode) {
      let current: Node<T> = this.headNode;
      while (current.next !== null) {
        current = current.next;
      }
      return current.data;
    }
    return null;
  }

  get values(): T[] {
    const values: T[] = [];
    for (const nodeData of this) {
      values.push(nodeData);
    }
    return values;
  }

  public empty(): Boolean {
    return this.listSize === 0;
  }

  public get(pos: number): T {
    let currentPos: number = 0;
    let currentNode: Node<T> | null = this.headNode;
    while (currentNode !== null) {
      if (currentPos === pos) {
        return currentNode.data;
      }
      currentPos++;
      currentNode = currentNode.next;
    }
    throw(new RangeError(`Given position (${pos}) is out of list range.`));
  }

  public pushFront(newData: T): void {
    const newHead = new Node<T>(newData);
    newHead.next = this.headNode;
    this.headNode = newHead;
    this.listSize++;
  }

  public popFront(): void {
    if (this.headNode === null) {
      throw(new Error('List is empty.'));
    } else {
      this.headNode = this.headNode.next;
      this.listSize--;
    }
  }

  public pushBack(newData: T): void {
    const newNode = new Node<T>(newData);
    let current: Node<T> | null = this.headNode;
    if (current === null) {
      this.headNode = newNode;
    } else {
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.listSize++;
  }

  public popBack(): void {
    if (this.headNode === null) {
      throw(new Error('List is empty.'));
    } else {
      if (this.listSize === 1) {
        this.headNode = null;
      } else {
        let currentNode: Node<T> | null = this.headNode.next;
        let previousNode: Node<T> | null = this.headNode;
        while (currentNode !== null && previousNode !== null) {
          if (currentNode.next === null) {
            previousNode.next = null;
            this.listSize--;
            return;
          }
          currentNode = currentNode.next;
          previousNode = previousNode.next;
        }
      }
    }
  }

  public insert(pos: number, newData: T): void {
    if (pos > this.listSize || pos < 0) {
      throw(new RangeError(`Given position (${pos}) is out of list range.`));
    }
    const newNode = new Node<T>(newData);
    if (this.headNode === null) {
      this.headNode = newNode;
    } else {
      if (pos === 0) {
        newNode.next = this.headNode;
        this.headNode = newNode;
      } else if (pos === this.listSize) {
        this.pushBack(newData);
      } else {
        let currentPos: number = 0;
        let currentNode: Node<T> | null = this.headNode;
        while (currentNode !== null) {
          if (currentPos === pos - 1) {
            newNode.next = currentNode.next;
            currentNode.next = newNode;
            return;
          }
          currentPos++;
          currentNode = currentNode.next;
        }
      } 
    }
    this.listSize++;
  }

  public erase(pos: number): void {
    if (pos >= this.listSize || pos < 0) {
      throw(new RangeError(`Given position (${pos}) is out of list range.`));
    }
    if (this.headNode === null) {
      throw(new Error('List is empty.'));
    } else {
      if (pos === 0) {
        this.headNode = this.headNode.next;
      } else {
        let currentPos: number = 0;
        let currentNode: Node<T> | null = this.headNode;
        while (currentNode !== null) {
          if (currentPos === pos - 1) {
            if (currentNode.next !== null) {
              currentNode.next = currentNode.next.next;
              this.listSize--;
            }
            return;
          }
          currentPos++;
          currentNode = currentNode.next;
        }
      }
    }
  }

  public [Symbol.iterator](): Iterator<T> {
    let current: Node<T> | null = this.headNode;
    return {
      next(): IteratorResult<T, any> {
        if (current === null) {
          return { done: true, value: null };
        } else {
          const result = { done: false, value: current.data };
          current = current.next;
          return result;
        }
      }
    }
  }

  public length(): number {
    return this.listSize;
  }

  public every(callback: nodeConditionCallback<T>): boolean {
    for (const current of this) {
      if (!callback(current)) {
        return false;
      }
    }
    return true;
  }

  public find(callback: nodeConditionCallback<T>): T | undefined {
    for (const current of this) {
      if (callback(current)) {
        return current;
      }
    }
  }

  public findIndex(callback: nodeConditionCallback<T>): number | undefined {
    let index: number = 0;
    for (const current of this) {
      if (callback(current)) {
        return index;
      }
      index++;
    }
  }

  public forEach(callback: nodeCallback<T>): void {
    for (const current of this) {
      callback(current);
    }
  }

  public includes(data: T): boolean {
    for (const current of this) {
      if (current === data) {
        return true;
      }
    }
    return false;
  }

  public indexOf(data: T): number {
    let index = 0;
    for (const current of this) {
      if (current === data) {
        return index;
      }
      index++;
    }
    return -1;
  }

  public lastIndexOf(data: T): number {
    let dataIndex = -1;
    let currentIndex = 0;
    for (const current of this) {
      if (current === data) {
        dataIndex = currentIndex;
      }
      currentIndex++;
    }
    return dataIndex;
  }

  public some(callback: nodeConditionCallback<T>): boolean {
    for (const current of this) {
      if (callback(current)) {
        return true;
      }
    }
    return false;
  }

  public toString(): string {
    let result = '{ ';
    this.forEach((x) => {
      result += (x + ' ');
    });
    result += '}';
    return result;
  }
}