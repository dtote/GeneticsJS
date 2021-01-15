/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { NumericRange } from '../../../../individual/numeric/base';
import { IntegerIndividual } from '../../../../individual/numeric/integer';
import { RandomResetting } from '../../../../mutation/numeric/integer';

describe('RandomResetting tests', () => {
  const mutator = new RandomResetting();
  test('Generation test', () => {
    const ind = new IntegerIndividual([2, 4, 5, 8], new NumericRange(0, 9));
    const newInd = new IntegerIndividual('');
    for (let i = 0; i < 1000; i++) {
      newInd.deepCopy(ind);
      expect(newInd.genotype).toEqual(ind.genotype);
      mutator.mutate(newInd, 0.99);
      expect(newInd.range).toEqual(ind.range);
      newInd.forEach(gene => expect(NumericRange.isValueInRange(gene, newInd.range)).toBeTruthy());
    }
  });
});
