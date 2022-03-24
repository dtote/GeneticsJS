/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedIndividual } from '../../../../../../individual/numeric/mixed';
import MixedIndividualMock from '../../../../mocks/individual/numeric/mixed/MixedIndividualMock';

const mixedIndividualTestSuite = (mixedIndividualTests: MixedIndividualMock) => {
  describe('MixedIndividual test suite', () => {
    test('creation test', () => {
      const { representation, range } = mixedIndividualTests.creation;
      const individual = new MixedIndividual(representation, range);
      expect(individual.genotype).toEqual(mixedIndividualTests.expectedGenotype);
      expect(individual.range).toEqual(mixedIndividualTests.expectedRange);
    });

    if (mixedIndividualTests.creationError !== undefined) {
      test('creation error test', () => {
        const creationError = mixedIndividualTests.creationError!;
        creationError.forEach(test => {
          const { representation, range } = test;
          expect(() => new MixedIndividual(representation, range)).toThrow(Error);
        });
      });
    }
  });
};

export default mixedIndividualTestSuite;
