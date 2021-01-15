/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { OnePointCrossover } from '../../../crossover/base/OnePointCrossover';
import { Generator } from '../../../generator/utils';
import { BaseIndividual } from '../../../individual/base';
import { BinaryIndividual } from '../../../individual/binary';
import OnePointCrossoverMock from '../../resources/mocks/crossover/base/1-point/OnePointCrossoverMock';

// mocks
jest.mock('../../../generator/utils/');

// data
import { Binary } from '../../resources/mocks/crossover/base/1-point/data';

const onePointTestSuite = <I extends BaseIndividual<T>, T>(
  mock: Array<OnePointCrossoverMock<I, T>>,
  message: string,
  cross: OnePointCrossover<I, T>,
) => {
  describe(message, () => {
    mock.forEach(mockTest => {
      test(`Individuals => ${mockTest.firstParent} x ${mockTest.secondParent}`, () => {
        const mockedGenerator = Generator as jest.Mocked<typeof Generator>;
        mockedGenerator.generateInteger.mockReturnValueOnce(mockTest.crossoverPoint);
        const result = cross.cross(
          mockTest.firstParent,
          mockTest.secondParent,
          mockTest.params.individualConstructor,
          mockTest.params.engine,
        );
        expect(result[0]).toEqual(mockTest.offspring[0]);
        expect(result[1]).toEqual(mockTest.offspring[1]);
      });
    });
  });
};

describe('One Point crossover tests', () => {
  onePointTestSuite(Binary, 'With binary individual', new OnePointCrossover<BinaryIndividual, boolean>());
});
