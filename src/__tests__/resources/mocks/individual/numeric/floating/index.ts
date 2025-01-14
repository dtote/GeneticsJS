/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import * as FloatingMock from './data';
import FloatingIndividualMock from './FloatingIndividualMock';

interface Mock {
  [key: string]: FloatingIndividualMock;
}

const mocks: Mock = {
  ...FloatingMock,
};

export default mocks;
