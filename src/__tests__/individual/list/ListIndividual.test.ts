/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { ListIndividual } from '../../../index';
import ListIndividualMock from '../../resources/mocks/individual/list/listIndividual/ListIndividualMock';
import ListIndividualTestMocks from '../../resources/mocks/individual/list/listIndividual';

import baseIndividualTestSuite from '../../resources/suites/individual/base/BaseIndividualTestSuite';
import mutableIndividualTestSuite from '../../resources/suites/individual/base/MutableIndividualTestSuite';
import listTestSuite from '../../resources/suites/individual/list/listIndividual/listIndividualTestSuite';

const creation = (initializationParams: ListIndividualMock<any>) => {
  return new ListIndividual(initializationParams.creation.data);
};

Object.keys(ListIndividualTestMocks).forEach(key => {
  const test = ListIndividualTestMocks[key];
  describe(`${test.testName} for ListIndividual`, () => {
    baseIndividualTestSuite(test, creation);
    mutableIndividualTestSuite(test, creation);
    listTestSuite(test);
  });
});
