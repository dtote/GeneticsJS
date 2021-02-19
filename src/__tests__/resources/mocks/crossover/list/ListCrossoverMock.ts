/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { ListIndividual } from '../../../../../index';

export interface ListCrossoverMock<T> {
  firstParent: ListIndividual<T>;
  secondParent: ListIndividual<T>;
  expected?: ListIndividual<T>[];
}
