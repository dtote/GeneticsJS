/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import {BaseFloatingCrossover} from '../../../crossover/numeric/floating/BaseFloatingCrossover';
import {SimpleArithmeticRecombination} from '../../../crossover/numeric/floating/SimpleArithmeticRecombination';
import {SingleArithmeticRecombination} from '../../../crossover/numeric/floating/SingleArithmeticRecombination';
import {WholeArithmeticCrossover} from '../../../crossover/numeric/floating/WholeArithmeticCrossover';
import { Generator } from '../../../generator/utils';
import { FloatingCrossoverMock } from '../../resources/mocks/crossover/floating/FloatingCrossoverMock';

// mocks
jest.mock('../../../generator/utils/');

// data
import { Simple, Single, Whole } from '../../resources/mocks/crossover/floating/data';

const floatingCrossoverTestSuite = <X extends BaseFloatingCrossover>(
  mock: FloatingCrossoverMock[],
  message: string,
  cross: X,
) => {
  describe(message, () => {
    mock.forEach(mockTest => {
      test(`Individuals => ${mockTest.firstParent} x ${mockTest.secondParent}`, () => {
        const mockedGenerator = Generator as jest.Mocked<typeof Generator>;
        mockedGenerator.probabilityIsValid.mockReturnValue(true);
        mockedGenerator.generateInteger.mockReturnValueOnce(mockTest.recombinationPoint);
        const result = cross.cross(
          mockTest.firstParent,
          mockTest.secondParent,
          mockTest.params.alpha,
          mockTest.params.engine,
        );
        expect(result[0]).toEqual(mockTest.offspring[0]);
        expect(result[1]).toEqual(mockTest.offspring[1]);
      });
    });
  });
};

describe('Floating crossover tests', () => {
  floatingCrossoverTestSuite(Simple, 'Simple arithmetic recombination tests', new SimpleArithmeticRecombination());
  floatingCrossoverTestSuite(Single, 'Single arithmetic recombination tests', new SingleArithmeticRecombination());
  floatingCrossoverTestSuite(Whole, 'Whole arithmetic recombination tests', new WholeArithmeticCrossover());
});
