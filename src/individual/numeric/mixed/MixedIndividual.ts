/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedReader } from '../../../reader/numeric/mixed';
import { NumericIndividual, NumericRange } from '../base';

/**
 * ## Mixed Individual
 * Mixed individual is an individual which
 * contains an array of integer and floating point numbers.
 * The representation could be a string with
 * the numbers or the array of numbers.
 */
export class MixedIndividual extends NumericIndividual {
  /**
   * Constructor of the class.
   * It takes a representation and a range as
   * parameters.
   *
   * Representation could be a string or an
   * array of numbers. If representation is
   * a `string`, it takes the default range as
   * parameter. if it is a number[]` it takes the
   * specified range.
   * @param representation
   * @param range of the individual. Only if representation
   *        is a `number[]`.
   * @throws Error if range is not valid.
   * @throws RangeError if representation is a `number[]` and
   *          is not in range specified by the range parameter.
   * @throws Error if representation is an `string` with an
   *          wrong format.
   */
  constructor(representation: number[] | string, range: NumericRange = NumericRange.DEFAULT) {
    if (typeof representation === 'string') {
      super([]);
      const reader = new MixedReader();
      this.copy(reader.read(representation));
    } else {
      super(representation, range);
    }
  }
}
