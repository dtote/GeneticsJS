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
  testName: 'Creation Test',
  creation: {
    data: 4,
    expectedLength: 1,
    expectedHead: 4,
  },
  values: [4],
  front: 4,
  back: 4,
  empty: false,
};

export default I;
