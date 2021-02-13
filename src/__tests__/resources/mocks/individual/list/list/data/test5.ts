/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import ListMock from '../ListMock';

const I: ListMock<number> = {
  testName: 'Finding and checking Tests',
  creation: {
    data: undefined,
    expectedLength: 5,
    expectedHead: 3,
    nodes: [3, 1, 5, 7, 9],
  },
  values: [3, 1, 5, 7, 9],
  every: [
    {
      expected: true,
      callback: x => {
        return Number.isInteger(x);
      },
    },
    {
      expected: false,
      callback: x => {
        return x === 3;
      },
    },
  ],
  find: [
    {
      expected: undefined,
      callback: x => {
        return x % 2 === 0;
      },
    },
    {
      expected: 9,
      callback: x => {
        return x === 9;
      },
    },
  ],
  findIndex: [
    {
      expected: 2,
      callback: x => {
        return x === 5;
      },
    },
    {
      expected: undefined,
      callback: x => {
        return x % 2 === 0;
      },
    },
  ],
  includes: [
    {
      data: 3,
      expected: true,
    },
    {
      data: 0,
      expected: false,
    },
  ],
  indexOf: [
    {
      data: 3,
      expected: 0,
    },
    {
      data: 0,
      expected: -1,
    },
  ],
  lastIndexOf: [
    {
      data: 9,
      expected: 4,
    },
    {
      data: 0,
      expected: -1,
    },
  ],
  some: [
    {
      expected: true,
      callback: x => {
        return x + 1 === 6;
      },
    },
    {
      expected: false,
      callback: x => {
        return x % 2 === 0;
      },
    },
  ],
  swap: [
    {
      firstIndex: 1,
      secondIndex: 4,
      expected: [3, 9, 5, 7, 1]
    },
    {
      firstIndex: 0,
      secondIndex: 2,
      expected: [5, 9, 3, 7, 1]
    },
    {
      firstIndex: -1,
      secondIndex: 4,
      error: true,
      expected: []
    }
  ]
};

export default I;
