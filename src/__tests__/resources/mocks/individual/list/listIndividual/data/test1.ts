/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { List } from '../../../../../../../individual';
import ListIndividualMock from '../ListIndividualMock';

const inputData = {
  data: [
    [1, 3, 4],
    [0, 2, 6],
    [2, 6, 7],
  ],
};

const A = new List<number>();
const B = new List<number>();
const C = new List<number>();

for (let i = 0; i < inputData.data[0].length; i++) {
  A.pushBack(inputData.data[0][i]);
  B.pushBack(inputData.data[1][i]);
  C.pushBack(inputData.data[2][i]);
}

export const I: ListIndividualMock<number> = {
  testName: 'Creation test',
  creation: {
    data: inputData,
    expected: '{ 1 3 4 } { 0 2 6 } { 2 6 7 }',
  },
  expectedGenotype: [A, B, C],
};

export default I;
