/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../../generator/utils';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { UniformMutation, UniformMutationParams as MixedUniformMutationParams } from '../../base';

export class MixedUniformMutation extends UniformMutation<MixedIndividual, number> {
  protected mutateGeneUniformly(individual: MixedIndividual, index: number, params: MixedUniformMutationParams): void {
    individual.set(index, Generator.generateMixed(individual.range, params.engine));
  }
}

export { MixedUniformMutationParams };
