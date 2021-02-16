/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { BaseListCrossover } from '../../../../../index';
import { ListCrossoverMock } from '../../../mocks/crossover/list/ListCrossoverMock';

export const listCrossoverTestSuite = <X extends BaseListCrossover<T>, T>(
  mock: ListCrossoverMock<T>[],
  message: string,
  crossover: X
) => {
  describe(message, () => {
    mock.forEach(mockTest => {
      test(`Individuals => ${mockTest.firstParent} x ${mockTest.secondParent}`, () => {
        const result = crossover.cross(mockTest.firstParent, mockTest.secondParent);
        console.log(result[0].toString());
        console.log(result[1].toString());
      });
    });
  });
};