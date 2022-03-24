/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { NumericRange } from '../../../../../../individual/numeric/base';
import { MixedIndividual } from '../../../../../../individual/numeric/mixed';
import NumericIndividualMock from '../base/NumericIndividualMock';

interface MixedIndividualMock extends NumericIndividualMock<MixedIndividual> {
  creation: {
    representation: string | number[];
    range?: NumericRange;
  };
  creationError?: Array<{
    representation: string | number[];
    range?: NumericRange;
  }>;
}

export default MixedIndividualMock;
