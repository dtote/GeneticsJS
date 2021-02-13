/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

interface nodeConditionCallback<T, E> {
  expected: E;
  callback: (data: T) => boolean;
}

interface nodeCallback<T> {
  expected: Array<T>;
  callback: (data: T) => any;
}

interface ListMock<T> {
  testName: string;
  creation: {
    data: T | undefined;
    expectedLength: number;
    expectedHead: T | null;
    nodes?: Array<T>;
  };
  values?: Array<T>;
  back?: T | null;
  front?: T | null;
  empty?: boolean;
  get?: Array<{
    index: number;
    expected: T | null;
    error?: boolean;
  }>;
  pushFront?: {
    data: T;
    expected: Array<T>;
  };
  popFront?: Array<{
    error?: boolean;
    expected: Array<T>;
  }>;
  pushBack?: {
    data: T;
    expected: Array<T>;
  };
  popBack?: Array<{
    error?: boolean;
    expected: Array<T>;
  }>;
  insert?: Array<{
    pos: number;
    data: T;
    error?: boolean;
    expected: Array<T>;
  }>;
  erase?: Array<{
    pos: number;
    error?: boolean;
    expected: Array<T>;
  }>;
  every?: Array<nodeConditionCallback<T, boolean>>;
  find?: Array<nodeConditionCallback<T, T | undefined>>;
  findIndex?: Array<nodeConditionCallback<T, number | undefined>>;
  includes?: Array<{
    data: T;
    expected: boolean;
  }>;
  indexOf?: Array<{
    data: T;
    expected: number;
  }>;
  lastIndexOf?: Array<{
    data: T;
    expected: number;
  }>;
  some?: Array<nodeConditionCallback<T, boolean>>;
  forEach?: nodeCallback<T>;
  toStringTest?: string;
  swap?: Array<{
    firstIndex: number;
    secondIndex: number;
    error?: boolean;
    expected: Array<T>;
  }>;
}

export default ListMock;
