/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { ListIndividual } from '../../../../../../index';
import { createList } from '../../../../../../utils/createList';
import { ListCrossoverMock } from '../ListCrossoverMock';

const ind1 = new ListIndividual([createList([1, 2]), createList([3, 4])]);
const ind2 = new ListIndividual([createList([5, 6]), createList([7, 8])]);
const ind3 = new ListIndividual([createList([1]), createList([2])]);
const ind4 = new ListIndividual([createList([3]), createList([4])]);
const ind5 = new ListIndividual([createList([]), createList([])]);

export const NodeExchange: ListCrossoverMock<number>[] = [
  {
    firstParent: ind1,
    secondParent: ind2,
  },
  {
    firstParent: ind3,
    secondParent: ind4,
    expected: [ind4, ind3],
  },
  {
    firstParent: ind3,
    secondParent: ind5,
    expected: [ind3, ind5],
  },
];
