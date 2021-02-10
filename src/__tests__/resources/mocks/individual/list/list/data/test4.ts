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
  testName: 'Extractions Tests',
  creation: {
    data: undefined,
    expectedLength: 3,
    expectedHead: 3,
    nodes: [3, 4, 5],
  },
  values: [3, 4, 5],
  popFront: [
    {
      expected: [4, 5],
    },
    {
      expected: [5],
    },
    {
      expected: [],
    },
    {
      error: true,
      expected: [],
    },
  ],
  popBack: [
    {
      expected: [3, 4],
    },
    {
      expected: [3],
    },
    {
      expected: [],
    },
    {
      error: true,
      expected: [],
    },
  ],
  erase: [
    {
      pos: 0,
      expected: [4, 5],
    },
    {
      pos: 1,
      expected: [4],
    },
    {
      pos: 0,
      expected: [],
    },
    {
      pos: 0,
      error: true,
      expected: [],
    },
  ],
};

export default I;
