/*
 * @license
 * Copyright (c) 2022 Néstor Torres.
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { isInteger } from 'lodash';
import { NumericRange } from '../individual';

/**
 * Checks the range and returns true if both bounds of the range are integers.
 * @param range Range to be checked
 * @return True if the both numbers of the range are integers
 */
export function isIntegerRange(range: NumericRange): boolean {
  return isInteger(range.lowest) && isInteger(range.highest);
}
