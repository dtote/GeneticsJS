/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { NodeExchangeCrossover } from '../../../index';

import { NodeExchange } from '../../resources/mocks/crossover/list/data';
import { listCrossoverTestSuite } from '../../resources/suites/crossover/list/ListCrossoverTestSuite';

describe('Floating crossover tests', () => {
  listCrossoverTestSuite(NodeExchange, 'Simple arithmetic recombination tests', new NodeExchangeCrossover<any>());
});
