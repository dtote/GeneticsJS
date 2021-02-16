/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { isEqual } from '../../../../../../../index';
import { List } from '../../../../../../../individual';
import { ListIndividual } from '../../../../../../../index';
import { createList } from '../../../../../../../utils/createList';
import ListIndividualMock from '../ListIndividualMock';

const inputData = [
  [1, 3, 4],
  [0, 2, 6],
  [2, 6, 7],
];

const otherInputData = [
  [2, 4, 6],
  [0, 3, 7],
  [9, 6, 8],
];

const A = createList<number>(inputData[0]);
const B = createList<number>(inputData[1]);
const C = createList<number>(inputData[2]);
const D = createList<number>(otherInputData[0]);
const E = createList<number>(otherInputData[1]);
const F = createList<number>(otherInputData[2]);

const copyExpected = [D, E, C];

export const I: ListIndividualMock<number> = {
  testName: 'MutableIndividual methods test',
  creation: {
    data: [A, B, C],
    expected: '{ 1 3 4 } { 0 2 6 } { 2 6 7 }',
  },
  expectedGenotype: [A, B, C],
  copy: [
    {
      change: [
        { geneIndex: 0, gene: D },
        { geneIndex: 1, gene: E },
      ],
      other: new ListIndividual(copyExpected),
    },
  ],
  deepCopy: [
    {
      change: [
        { geneIndex: 0, gene: D },
        { geneIndex: 1, gene: E },
      ],
      other: new ListIndividual(copyExpected),
    },
  ],
  copyWithin: [
    {
      expected: [B, B, C],
      params: {
        end: 2,
        start: 1,
        target: 0,
      },
    },
  ],
  every: [
    {
      callback: (gene: List<number>) => {
        return gene.every(x => {
          return Number.isInteger(x);
        });
      },
      expected: true,
    },
  ],
  fill: [
    {
      expected: [A, E, E],
      params: {
        end: 3,
        gene: E,
        start: 1,
      },
    },
  ],
  find: [
    {
      callback: (gene: List<number>) => {
        return isEqual(gene, B);
      },
      expected: B,
    },
    {
      callback: (gene: List<number>) => {
        return isEqual(gene, C);
      },
      expected: C,
    },
  ],
  findIndex: [
    {
      callback: (gene: List<number>) => {
        return isEqual(gene, B);
      },
      expected: 1,
    },
    {
      callback: (gene: List<number>) => {
        return isEqual(gene, A);
      },
      expected: 0,
    },
    {
      callback: (gene: List<number>) => {
        return isEqual(gene, E);
      },
      expected: -1,
    },
  ],
  get: [
    {
      expected: A,
      params: 0,
    },
    {
      expected: B,
      params: 1,
    },
    {
      expected: C,
      params: 2,
    },
  ],
  includes: [
    {
      expected: true,
      params: { gene: A },
    },
    {
      expected: false,
      params: { gene: E },
    },
    {
      expected: false,
      params: { gene: A, startIndex: 2 },
    },
  ],
  indexOf: [
    {
      expected: 0,
      params: {
        gene: A,
      },
    },
    {
      expected: 2,
      params: {
        gene: C,
      },
    },
    {
      expected: -1,
      params: {
        gene: B,
        startIndex: 2,
      },
    },
  ],
  lastIndexOf: [
    {
      expected: 0,
      params: {
        gene: A,
      },
    },
    {
      expected: 2,
      params: {
        gene: C,
      },
    },
    {
      expected: -1,
      params: {
        gene: C,
        fromIndex: 1,
      },
    },
  ],
  length: {
    expected: 3,
  },
  map: [
    {
      callback: (gene: List<number>) => (gene = D),
      expected: [D, D, D],
    },
  ],
  reverse: {
    expected: [C, B, A],
  },
  set: [
    {
      params: {
        gene: D,
        geneIndex: 0,
      },
    },
    {
      params: {
        gene: E,
        geneIndex: 2,
      },
    },
    {
      params: {
        gene: F,
        geneIndex: 1,
      },
    },
  ],
  some: [
    {
      callback: (gene: List<number>) => isEqual(gene, A),
      expected: true,
    },
    {
      callback: (gene: List<number>) => isEqual(gene, B),
      expected: true,
    },
    {
      callback: (gene: List<number>) => isEqual(gene, E),
      expected: false,
    },
  ],
  toStringTest: {
    expected: '{ 1 3 4 } { 0 2 6 } { 2 6 7 }',
  },
};

export default I;
