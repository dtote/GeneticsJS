/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

 /**
  * ## Node
  * Node is an element of a simple linked list. It contains some data and a
  * pointer to the next node in the list.
  */
export class Node<T> {
  /**
   * Data of the node.
   */
  private nodeData: T;
  /**
   * Pointer to the next node in the list.
   */
  private nextNode: Node<T> | null = null;

  /**
   * Constructor of the class.
   * Initializes the data of the node.
   * @param data Data to initialize the node
   */
  constructor(data: T) {
    this.nodeData = data;
  }

  /**
   * Getter for the data of the node.
   * @return Data of the node.
   */
  get data(): T {
    return this.nodeData;
  }

  /**
   * Setter for the data of the node.
   * @param newData New data for the node
   */
  set data(newData: T) {
    this.nodeData = newData;
  }

  /**
   * Getter for the pointer of the next node in the list.
   * @return Pointer to the next node.
   */
  get next(): Node<T> | null {
    return this.nextNode;
  }

  /**
   * Setter of the pointer to the next node.
   * @param nextNode New pointer to the next node
   */
  set next(nextNode: Node<T> | null) {
    this.nextNode = nextNode;
  }
}
