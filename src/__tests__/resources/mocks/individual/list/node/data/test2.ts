/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import NodeMock from '../NodeMock';

const N: NodeMock<String> = {
  creation: {
    data: 'nuevoNodo',
    next: null,
  },
};

const I: NodeMock<String> = {
  creation: {
    data: 'nodo',
    next: null,
  },
  newData: 'nuevo',
  data: 'nuevo',
  newNode: 'nuevoNodo',
  next: N,
};

export default I;