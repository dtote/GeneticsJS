/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../../../../../../generator/utils';
import { BinaryIndividual } from '../../../../../../../individual/binary';
import NPointsCrossoverMock from '../NPointsCrossoverMock';

const mocks: Array<NPointsCrossoverMock<BinaryIndividual, boolean>> = [
  {
    crossoverPoints: [1, 3],
    firstParent: new BinaryIndividual('10001'),
    offspring: [new BinaryIndividual('10001'), new BinaryIndividual('11010')],
    params: {
      engine: Generator.DEFAULT_ENGINE,
      individualConstructor: BinaryIndividual,
      numberOfCrossoverPoints: 2,
      crossoverThreshold: 1.0,
    },
    secondParent: new BinaryIndividual('11010'),
  },
  {
    crossoverPoints: [1],
    firstParent: new BinaryIndividual('10'),
    offspring: [new BinaryIndividual('10'), new BinaryIndividual('01')],
    params: {
      engine: Generator.DEFAULT_ENGINE,
      individualConstructor: BinaryIndividual,
      numberOfCrossoverPoints: 1,
      crossoverThreshold: 1.0,
    },
    secondParent: new BinaryIndividual('01'),
  },
  {
    crossoverPoints: [1, 2, 3, 4, 5, 6],
    firstParent: new BinaryIndividual('1001011'),
    offspring: [new BinaryIndividual('1001011'), new BinaryIndividual('0010101')],
    params: {
      engine: Generator.DEFAULT_ENGINE,
      individualConstructor: BinaryIndividual,
      numberOfCrossoverPoints: 6,
      crossoverThreshold: 1.0,
    },
    secondParent: new BinaryIndividual('0010101'),
  },
];

export default mocks;
