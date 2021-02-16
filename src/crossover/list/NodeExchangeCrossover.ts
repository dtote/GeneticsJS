/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { ListIndividual } from '../../index';
import { List } from '../../index';
import { BaseListCrossover, NodeExchangeCrossoverParams } from './BaseListCrossover';
import { createList } from '../../__tests__/resources/mocks/individual/list/listIndividual/data/utils';

/**
 * ## NodeExchangeCrossover
 * 
 * Class that defines a crossover operator for List Individuals. It is applied
 * to each gene of the parents and exhanges one node selected at random.
 * 
 * For the first child, the corresponding gene will be a list with the nodes of
 * the first parent, but one of them will be replaced with one from the second
 * parent. For the second child, it will have the nodes of the second parent but
 * won't have the node that was given to the first one, and instead, it will
 * have the one that was replaced.
 */
export class NodeExchangeCrossover<T> extends BaseListCrossover<T> {
  /**
   * Calculates the gene of the corresponding index for the new individuals.
   * The first child has the nodes of the first parent, but one of them is
   * replaced with one of the second parent. The same happens to the second
   * child but with the nodes of the second parent.
   * @param firstParent 
   * @param secondParent 
   * @param params 
   * @param index 
   */
  protected getGenotypeValues(
    firstParent: ListIndividual<T>,
    secondParent: ListIndividual<T>,
    params: NodeExchangeCrossoverParams<T>,
    index: number
  ): { first: List<T>; second: List<T> } {
    const firstValues = firstParent.get(index).values;
    const secondValues = secondParent.get(index).values;
    if (this.crossoverIndexes[index][0] >= 0 && this.crossoverIndexes[index][1] >= 0) {
      let aux = firstValues[this.crossoverIndexes[index][0]];
      firstValues[this.crossoverIndexes[index][0]] = secondValues[this.crossoverIndexes[index][1]];
      secondValues[this.crossoverIndexes[index][1]] = aux;
    }
    return {
      first: createList(firstValues),
      second: createList(secondValues)
    }
  }
}