/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../../generator/utils';
import { BaseIndividual, BinaryIndividual, NPointsCrossover } from '../../../index';
import NPointsCrossoverMock from '../../resources/mocks/crossover/base/n-points/NPointsCrossoverMock';

// mocks
jest.mock('../../../generator/utils/');

// test suites import
import { Binary } from '../../resources/mocks/crossover/base/n-points/data';

const nPointsTestSuite = <I extends BaseIndividual<T>, T>(
  mock: Array<NPointsCrossoverMock<I, T>>,
  message: string,
  cross: NPointsCrossover<I, T>,
) => {
  describe(message, () => {
    mock.forEach(mockTest => {
      test(`Individuals => ${mockTest.firstParent} x ${mockTest.secondParent}`, () => {
        const mockedGenerator = Generator as jest.Mocked<typeof Generator>;
        mockedGenerator.probabilityIsValid.mockReturnValue(true);
        mockTest.crossoverPoints.forEach(point => {
          mockedGenerator.generateInteger.mockReturnValueOnce(point);
        });
        const result = cross.cross(
          mockTest.firstParent,
          mockTest.secondParent,
          mockTest.params.numberOfCrossoverPoints,
          mockTest.params.individualConstructor,
          mockTest.params.crossoverThreshold,
          mockTest.params.engine,
        );
        expect(result[0]).toEqual(mockTest.offspring[0]);
        expect(result[1]).toEqual(mockTest.offspring[1]);
      });
    });
  });
};

describe('N Points crossover tests', () => {
  nPointsTestSuite(Binary, 'With binary individual', new NPointsCrossover<BinaryIndividual, boolean>());
});
