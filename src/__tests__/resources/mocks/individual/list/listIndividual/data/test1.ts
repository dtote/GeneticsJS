/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { List } from '../../../../../../../individual';
import { createList } from '../../../../../../../utils/createList';
import ListIndividualMock from '../ListIndividualMock';

const inputData = [
  [1, 3, 4],
  [0, 2, 6],
  [2, 6, 7],
];

const A = createList<number>(inputData[0]);
const B = createList<number>(inputData[1]);
const C = createList<number>(inputData[2]);

export const I: ListIndividualMock<number> = {
  testName: 'Creation test',
  creation: {
    data: [A, B, C],
    expected: '{ 1 3 4 } { 0 2 6 } { 2 6 7 }',
  },
  expectedGenotype: [A, B, C],
};

export default I;
