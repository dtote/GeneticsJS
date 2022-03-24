/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MixedReader } from '../../../../index';
import MixedReaderData from '../../../resources/mocks/reader/data/MixedReaderData';
import readerTestSuite from '../../../resources/suites/reader/ReaderTestSuite';

const reader = new MixedReader();
readerTestSuite(reader, MixedReaderData);
