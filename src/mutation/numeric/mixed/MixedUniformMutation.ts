/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../../generator/utils';
import { NumericRange } from '../../../individual';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { PARAMS_LOWER_BOUNDS } from '../../../optimization/constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../../../optimization/constants/UpperBounds';
import { isDefaultRange } from '../../../optimization/utils/isDefaultRange';
import { UniformMutation, UniformMutationParams as MixedUniformMutationParams } from '../../base';

export class MixedUniformMutation extends UniformMutation<MixedIndividual, number> {
  protected mutateGeneUniformly(individual: MixedIndividual, index: number, params: MixedUniformMutationParams): void {
    if (isDefaultRange(individual.range)) {
      individual.set(
        index,
        Generator.generateMixed(
          new NumericRange(PARAMS_LOWER_BOUNDS[index], PARAMS_UPPER_BOUNDS[index]),
          params.engine,
        ),
      );
    } else {
      individual.set(index, Generator.generateMixed(individual.range, params.engine));
    }
  }
}

export { MixedUniformMutationParams };
