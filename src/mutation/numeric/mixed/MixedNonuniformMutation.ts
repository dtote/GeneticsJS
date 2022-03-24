/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../../generator/utils';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { NumericNonUniformMutation, NumericNonUniformMutationParams as MixedNonUniformMutationParams } from '../base';

export class MixedNonuniformMutation extends NumericNonUniformMutation<MixedIndividual> {
  protected getDeltaValue(params: MixedNonUniformMutationParams): number {
    return Generator.generateNormalDistributionValue(0, params.stepSize, params.engine);
  }
}

export { MixedNonUniformMutationParams };
