/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

interface NodeMock<T> {
  creation: {
    data: T;
    next: null;
  };
  newData?: T;
  data?: T;
  newNode?: T;
  next?: NodeMock<T> | null;
}

export default NodeMock;
