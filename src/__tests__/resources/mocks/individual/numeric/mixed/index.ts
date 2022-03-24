/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import * as MixedMock from './data';
import MixedIndividualMock from './MixedIndividualMock';

interface Mock {
  [key: string]: MixedIndividualMock;
}

const mocks: Mock = {
  ...MixedMock,
};

export default mocks;
