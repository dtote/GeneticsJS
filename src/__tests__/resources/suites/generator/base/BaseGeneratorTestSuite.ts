/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { BaseGenerator } from '../../../../../generator/base';
import { GeneratorParams } from '../../../../../generator/base/GeneratorParams';
import { BaseIndividual } from '../../../../../individual/base/BaseIndividual';

const generatorTestSuite = <
  G extends BaseGenerator<I, Params, T>,
  I extends BaseIndividual<T>,
  Params extends GeneratorParams,
  T
>(
  generator: G,
  individual: I,
  params: Params,
) => {
  describe('BaseGenerator tests', () => {
    test('length test with generateWith', () => {
      expect(individual.length()).toEqual(params.length);
    });
  });
};

export default generatorTestSuite;
