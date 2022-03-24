/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { NumericRange } from '../../../../individual/numeric/base';
import { MixedIndividual } from '../../../../individual/numeric/mixed';
import { MixedUniformMutation } from '../../../../mutation/numeric/mixed';

describe('MixedUniformMutation tests', () => {
  const mutator = new MixedUniformMutation();
  test('Generation test', () => {
    const ind = new MixedIndividual([2, 4, 5, 8], new NumericRange(0, 9));
    const newInd = new MixedIndividual('');
    for (let i = 0; i < 1000; i++) {
      newInd.deepCopy(ind);
      expect(newInd.genotype).toEqual(ind.genotype);
      mutator.mutate(newInd, 1);
      expect(newInd.range).toEqual(ind.range);
      newInd.forEach(gene => expect(NumericRange.isValueInRange(gene, newInd.range)).toBeTruthy());
    }
  });
});
