/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */
import { PARAMS_LOWER_BOUNDS } from '../../../../../constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../../../../../constants/UpperBounds';
import { isDefaultRange } from '../../../../../utils/isDefaultRange';
import { NumericRange } from '../../../individual/numeric/base';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { Generator } from '../../utils';
import { NumericGenerator } from '../base';
import { NumericParams } from '../base/NumericGenerator';

/**
 * ## Mixed generator
 * Generates a [[MixedIndividual]].
 */
export class MixedGenerator extends NumericGenerator<MixedIndividual> {
  /**
   * Generates a gene with the specified
   * params.
   * @param params of the generator.
   * @return the generated gene.
   */
  public generateGene(params: NumericParams): number {
    if (!isDefaultRange(params.range)) {
      return Generator.generateMixed(params.range, params.engine);
    }

    const generatedIndividual = Generator.generateMixed(
      new NumericRange(PARAMS_LOWER_BOUNDS[params.geneIndex!], PARAMS_UPPER_BOUNDS[params.geneIndex!]),
      params.engine,
    );

    return generatedIndividual;
  }

  /**
   * Construct the [[MixedIndividual]] with
   * the specified genotype and range.
   * @param genotype of the generated individual.
   * @param params of the generator.
   * @return Constructed [[MixedIndividual]] from genotype.
   */
  public construct(genotype: number[], params: NumericParams): MixedIndividual {
    return new MixedIndividual(genotype, params.range);
  }
}
