/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedIndividual } from '../../../../../individual/numeric/mixed';
import ReaderMock from '../ReaderMock';

const creation: ReaderMock<MixedIndividual, number>['creation'] = [
  {
    expected: new MixedIndividual([]),
    representation: '',
  },
  {
    expected: new MixedIndividual([0]),
    representation: '0',
  },
  {
    expected: new MixedIndividual([-3.45]),
    representation: '-3.45',
  },
  {
    expected: new MixedIndividual([2, 9, 7, 8]),
    representation: '2 9 7 8',
  },
  {
    expected: new MixedIndividual([-3.67, 0.56, 0.002]),
    representation: '\t\t-3.67 \n0.56 2e-3   \n',
  },
  {
    expected: new MixedIndividual([5, 0.56, 0.002, -0.88899998]),
    representation: '\t\t5 \n0.56 2e-3 -.88899998  \n',
  },
];

const error: ReaderMock<MixedIndividual, number>['error'] = ['3.45.45', '--34.5', '-45e-3.28', 'letter', '.56e-.3'];

const mock: ReaderMock<MixedIndividual, number> = {
  creation,
  error,
};

export default mock;
