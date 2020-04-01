/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Engine } from 'random-js';
import { BaseIndividual } from '../../individual/base/BaseIndividual';
import { Population, PopulationItem } from '../../population/Population';

export interface SelectionImplementationParams {
  engine: Engine;
  selectionCount: number;
}

export interface SelectionImplementation<I extends BaseIndividual<T>, T> {
  select(
    population: Population<I, T>,
    params: SelectionImplementationParams,
    cumulativeProbabilityCallback: (item: PopulationItem<I, T>, index: number) => number,
  ): I[];
}
