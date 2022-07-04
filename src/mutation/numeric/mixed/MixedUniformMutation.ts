/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */
import { isDefaultRange } from '../../../../../utils/isDefaultRange';
import { Generator } from '../../../generator/utils';
import { NumericRange } from '../../../individual';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { UniformMutation, UniformMutationParams as MixedUniformMutationParams } from '../../base';
import { PARAMS_LOWER_BOUNDS } from './../../../../../constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from './../../../../../constants/UpperBounds';

export class MixedUniformMutation extends UniformMutation<MixedIndividual, number> {
  protected mutateGeneUniformly(individual: MixedIndividual, index: number, params: MixedUniformMutationParams): void {
    const actualRange = isDefaultRange(individual.range)
      ? new NumericRange(PARAMS_LOWER_BOUNDS[index], PARAMS_UPPER_BOUNDS[index])
      : individual.range;
    const newGene = Generator.generateMixed(actualRange, params.engine);

    individual.set(index, newGene);
  }
}

export { MixedUniformMutationParams };
