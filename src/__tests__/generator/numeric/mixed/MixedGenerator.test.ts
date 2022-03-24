/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedGenerator } from '../../../../index';
import MixedIndividualMock from '../../../resources/mocks/generator/numeric/mixed/MixedGeneratorMock';
import BaseGeneratorTestSuite from '../../../resources/suites/generator/base/BaseGeneratorTestSuite';
import NumericGeneratorTestSuite from '../../../resources/suites/generator/numeric/base/NumericGeneratorTestSuite';

MixedIndividualMock.forEach(testParams => {
  describe(`test suite with params - ${testParams.length} | [ ${testParams.range.lowest} - ${testParams.range.highest} ]`, () => {
    const generator = new MixedGenerator();
    const ind = generator.generateWith(testParams);
    BaseGeneratorTestSuite(generator, ind, testParams);
    NumericGeneratorTestSuite(generator, ind, testParams);
  });
});
