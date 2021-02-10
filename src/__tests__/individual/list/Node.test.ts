/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Node } from '../../../index';

import NodeTestSuite from '../../resources/suites/individual/list/node/NodeTestSuite';

import NodeMock from '../../resources/mocks/individual/list/node/NodeMock';
import NodeTestMocks from '../../resources/mocks/individual/list/node';

Object.keys(NodeTestMocks).forEach(key => {
  const test = NodeTestMocks[key];
  describe(`Tests for list node with data: ${test.creation.data}`, () => {
    NodeTestSuite(test);
  });
});
