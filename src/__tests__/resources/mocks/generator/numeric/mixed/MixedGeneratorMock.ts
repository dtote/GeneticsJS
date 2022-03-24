/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MersenneTwister19937 } from 'random-js';
import { NumericParams } from '../../../../../../generator/numeric/base/NumericGenerator';
import { NumericRange } from '../../../../../../individual/numeric/base';

const mixedMock: NumericParams[] = [
  {
    engine: MersenneTwister19937.autoSeed(),
    length: 10,
    range: new NumericRange(3.8, 14),
  },
  {
    engine: MersenneTwister19937.autoSeed(),
    length: 10,
    range: new NumericRange(3, 8),
  },
];

export default mixedMock;
