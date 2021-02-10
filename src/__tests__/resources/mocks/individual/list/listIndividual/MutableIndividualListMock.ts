/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MutableIndividual } from '../../../../../../index';
import { List } from '../../../../../../index';
import BaseIndividualMock from '../../base/BaseIndividualMock';

interface CopyMethods<I extends MutableIndividual<List<T>>, T> {
  change: Array<{
    geneIndex: number;
    gene: List<T>;
  }>;
  other: I;
}

interface MutableIndividualListMock<I extends MutableIndividual<List<T>>, T> extends BaseIndividualMock<I, List<T>> {
  copy?: Array<CopyMethods<I, T>>;
  deepCopy?: Array<CopyMethods<I, T>>;
  copyWithin?: Array<{
    params: {
      target: number;
      start?: number;
      end?: number;
    };
    expected: List<T>[];
  }>;
  fill?: Array<{
    params: {
      gene: List<T>;
      start?: number;
      end?: number;
    };
    expected: List<T>[];
  }>;
  map?: Array<{
    callback: (gene: List<T>, geneIndex?: number, genotype?: List<T>[]) => List<T>;
    expected: List<T>[];
  }>;
  reverse?: {
    expected: List<T>[];
  };
  set?: Array<{
    params: {
      geneIndex: number;
      gene: List<T>;
    };
  }>;
}

export default MutableIndividualListMock;
