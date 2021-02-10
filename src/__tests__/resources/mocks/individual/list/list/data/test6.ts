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
}

const I: ListMock<customObject> = {
  testName: 'ForEach Test',
  creation: {
    data: undefined,
    expectedLength: 2,
    expectedHead: { data: 2 },
    nodes: [{ data: 2 }, { data: 4 }],
  },
  forEach: {
    expected: [{ data: 6 }, { data: 12 }],
    callback: x => {
      x.data = x.data * 3;
    },
  },
};

export default I;
