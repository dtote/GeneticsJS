/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { BaseFloatingCrossoverParams } from '../../../../../crossover/numeric/floating';
import { FloatingIndividual } from '../../../../../individual/numeric/floating/FloatingIndividual';

export interface FloatingCrossoverMock {
  firstParent: FloatingIndividual;
  secondParent: FloatingIndividual;
  params: BaseFloatingCrossoverParams;
  offspring: FloatingIndividual[];
  recombinationPoint: number;
}
