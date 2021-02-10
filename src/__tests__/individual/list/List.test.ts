/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { List } from '../../../index';

import ListTestSuite from '../../resources/suites/individual/list/list/ListTestSuite';

import ListMock from '../../resources/mocks/individual/list/list/ListMock';
import ListTestMocks from '../../resources/mocks/individual/list/list';

Object.keys(ListTestMocks).forEach(key => {
  const test = ListTestMocks[key];
  describe(`${test.testName} for Lists`, () => {
    ListTestSuite(test);
  });
});
