/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */
import { NumericRange } from '../../../individual';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { Generator } from '../../utils';
import { NumericGenerator } from '../base';
import { NumericParams } from '../base/NumericGenerator';
import { RANGES } from './../../../optimization/constants/Ranges';

/**
 * ## Mixed generator
 * Generates a [[MixedIndividual]].
 */
export class MixedGenerator extends NumericGenerator<MixedIndividual> {
  static currentGeneIndex = 0;
  /**
   * Generates a gene with the specified
   * params.
   * @param params of the generator.
   * @return the generated gene.
   */
  public generateGene(params: NumericParams): number {
    const geneRange = RANGES[MixedGenerator.currentGeneIndex % 28];
    console.log({ geneRange });
    const generatedIndividual = Generator.generateMixed(
      new NumericRange(geneRange.lower, geneRange.upper),
      params.engine,
    );
    MixedGenerator.currentGeneIndex++;
    console.log({ generatedIndividual: generatedIndividual.toFixed() });

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
