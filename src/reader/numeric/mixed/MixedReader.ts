/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedIndividual } from '../../../individual/numeric/mixed';
import { IndividualToken } from '../../base';
import { NumericReader } from '../base';

/**
 * ## Mixed Individual reader
 * Implements a reader for mixed individuals.
 * The format of this individuals is the following:
 * ```
 * 3 -4 8 9     // OK (integer number are floating)
 * 3.45 845.5   // OK (fixed point notation)
 * 3e-2 4E-9    // OK (scientific notation allowed)
 * ```
 */

export class MixedReader extends NumericReader<MixedIndividual> {
  public readonly tokenDefinition: Array<IndividualToken<number>> = [
    {
      token: /^[+-]?\d+(?:(?:\.\d+)?(?:[Ee][+-]?\d+)?)?$/,
      value: (token: string) => Number.parseFloat(token),
    },
    {
      token: /^[+-]?\.\d+(?:[Ee][+-]?\d+)?$/,
      value: (token: string) => Number.parseFloat(token),
    },
  ];

  /**
   * Reads a definition and converts
   * into an [[MixedIndividual]].
   * @param definition of the individual.
   * @return the read individual.
   * @throws Error if definition is not correct.
   */
  public read(definition: string): MixedIndividual {
    const genotype = this.getGenotype(this.tokenize(definition));
    return new MixedIndividual(genotype);
  }
}
