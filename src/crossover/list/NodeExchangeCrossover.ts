/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../generator/utils';
import { ListIndividual } from '../../index';
import { List } from '../../index';
import { BaseListCrossover, NodeExchangeCrossoverParams } from './BaseListCrossover';
import { createList } from '../../utils/createList';
import { NumericRange } from '../../individual/numeric/base';

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
    index: number,
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
      second: createList(secondValues),
    };
  }

  /**
   * Establishes the index for the crossover operator of a given gene. It is
   * calculated based on the legnth of the list corresponding to the indicated
   * gene.
   * @param individual Current individual
   * @param geneIndex Position of the gene in the individual
   * @return Number corresponding to the index for the crossover operator.
   */
  protected getGeneCrossoverIndex(individual: ListIndividual<T>, geneIndex: number): number {
    let crossoverIndex: number = -1;
    const geneLength = individual.get(geneIndex).length();
    if (geneLength > 1) {
      const geneRange = new NumericRange(0, geneLength - 1);
      crossoverIndex = Generator.generateInteger(geneRange);
    } else if (geneLength === 1) {
      crossoverIndex = 0;
    }
    return crossoverIndex;
  }

  /**
   * For each list of both parents, a random index is generated based on the
   * previously calculated range.
   * @param firstParent First individual
   * @param secondParent Second individual
   */
  protected setCrossoverIndexes(firstParent: ListIndividual<T>, secondParent: ListIndividual<T>): void {
    for (let i = 0; i < firstParent.length(); i++) {
      this.crossoverIndexes[i] = [];
      this.crossoverIndexes[i].push(this.getGeneCrossoverIndex(firstParent, i));
      this.crossoverIndexes[i].push(this.getGeneCrossoverIndex(secondParent, i));
    }
  }
}
