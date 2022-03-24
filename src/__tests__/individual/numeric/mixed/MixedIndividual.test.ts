/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedIndividual } from '../../../../individual/numeric/mixed';
// mocks import
import MixedMock from '../../../resources/mocks/individual/numeric/mixed/';
import MixedIndividualMock from '../../../resources/mocks/individual/numeric/mixed/MixedIndividualMock';
// test suites import
import BaseIndividualTestSuite from '../../../resources/suites/individual/base/BaseIndividualTestSuite';
import MutableIndividualTestSuite from '../../../resources/suites/individual/base/MutableIndividualTestSuite';
import NumericIndividualTestSuite from '../../../resources/suites/individual/numeric/base/NumericIndividualTestSuite';
import MixedIndividualTestSuite from '../../../resources/suites/individual/numeric/mixed/MixedIndividualTestSuite';

const creation = (initializationParams: MixedIndividualMock) => {
  const { representation, range } = initializationParams.creation;
  return new MixedIndividual(representation, range);
};

Object.keys(MixedMock).forEach(key => {
  const test = MixedMock[key];
  describe(`tests for individual ${test.creation.representation}`, () => {
    BaseIndividualTestSuite(test, creation);
    MutableIndividualTestSuite(test, creation);
    NumericIndividualTestSuite(test, creation);
    MixedIndividualTestSuite(test);
  });
});
