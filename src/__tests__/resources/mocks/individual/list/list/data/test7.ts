/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import ListMock from '../ListMock';

interface customObject {
  data: number;
  toString: () => string;
}

class newObject implements customObject {
  public data: number;

  constructor(data: number) {
    this.data = data;
  }

  public toString(): string {
    return this.data.toString();
  }
}

const A = new newObject(2);
const B = new newObject(4);

const I: ListMock<customObject> = {
  testName: 'ToString Test',
  creation: {
    data: undefined,
    expectedLength: 2,
    expectedHead: A,
    nodes: [A, B],
  },
  toStringTest: '{ 2 4 }',
};

export default I;
