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
  crossover: X,
) => {
  describe(message, () => {
    mock.forEach(mockTest => {
      test(`Individuals => ${mockTest.firstParent} x ${mockTest.secondParent}`, () => {
        const { firstParent, secondParent, expected } = mockTest;
        const result = crossover.cross(firstParent, secondParent);
        for (let i = 0; i < firstParent.length(); i++) {
          expect(firstParent.get(i).length()).toEqual(result[0].get(i).length());
          expect(secondParent.get(i).length()).toEqual(result[1].get(i).length());
        }
        if (expected !== undefined) {
          expect(result).toEqual(expected);
        }
      });
    });
  });
};
