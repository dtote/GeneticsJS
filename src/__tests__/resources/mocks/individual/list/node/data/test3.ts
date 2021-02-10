/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import NodeMock from '../NodeMock';

const N: NodeMock<Number> = {
  creation: {
    data: 34,
    next: null,
  },
};

const I: NodeMock<Number> = {
  creation: {
    data: 0,
    next: null,
  },
  newData: -3,
  data: -3,
  newNode: 34,
  next: N,
};

export default I;
