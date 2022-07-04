/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { PARAMS_LOWER_BOUNDS } from '../../../../../constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../../../../../constants/UpperBounds';
import { isDefaultRange } from '../../../../../utils/isDefaultRange';
import { Generator } from '../../../generator/utils';
import { NumericIndividual, NumericRange } from '../../../individual/numeric/base';
import { MutationBase, MutationParams } from '../../base';

export interface NumericNonUniformMutationParams extends MutationParams {
  stepSize: number;
}

export abstract class NumericNonUniformMutation<I extends NumericIndividual> extends MutationBase<
  I,
  number,
  NumericNonUniformMutationParams
> {
  public mutate(individual: I, stepSize = 1.0, engine = Generator.DEFAULT_ENGINE): void {
    this.mutateWith(individual, { stepSize, engine });
  }

  protected mutateGene(individual: I, index: number, params: NumericNonUniformMutationParams): void {
    const gene = individual.get(index);
    const delta = this.getDeltaValue(params);

    const actualRange = isDefaultRange(individual.range)
      ? new NumericRange(PARAMS_LOWER_BOUNDS[index], PARAMS_UPPER_BOUNDS[index])
      : individual.range;

    const newGene = NumericRange.normalizeValueToRange(gene + delta, actualRange);

    individual.set(index, newGene);
  }

  protected abstract getDeltaValue(params: NumericNonUniformMutationParams): number;
}
