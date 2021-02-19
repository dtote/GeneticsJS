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
import { BaseCrossover } from '../index';
import { CrossoverParams } from '../index';

/**
 * ## NodeExchangeCrossoverParams
 * Interface to define the parameters for the crossover operation.
 */
export interface NodeExchangeCrossoverParams<T> extends CrossoverParams<ListIndividual<T>, List<T>> {}

/**
 * ## BaseListCrossover
 *
 * Abstract class that defines the basic methods for a crossover operation that
 * involves List Individuals.
 *
 * To implement a specific operator, the method getGenotypeValues must be
 * implemented.
 */
export abstract class BaseListCrossover<T> extends BaseCrossover<
  ListIndividual<T>,
  List<T>,
  NodeExchangeCrossoverParams<T>
> {
  /**
   * Index for each list of both parents to apply the operator.
   */
  protected crossoverIndexes: number[][] = [];

  /**
   * Apply the crossover operation between the two individuals given, using
   * the specified engine to generate random indexes. It returns the two
   * new individuals obtained.
   * @param firstParent First individual
   * @param secondParent Second individual
   * @param engine Engine to generate random indexes
   * @return Array with the two new individuals.
   */
  public cross(
    firstParent: ListIndividual<T>,
    secondParent: ListIndividual<T>,
    engine = Generator.DEFAULT_ENGINE,
  ): Array<ListIndividual<T>> {
    return this.crossWith(firstParent, secondParent, { engine, individualConstructor: ListIndividual });
  }

  /**
   * Apply the crossover operation between the two individuals given, using
   * the specified parameters. It returns the two new individuals obtained.
   * @param firstParent First individual
   * @param secondParent Second individual
   * @param params Parameters for the operator
   * @return Array with the two new individuals.
   */
  public crossWith(
    firstParent: ListIndividual<T>,
    secondParent: ListIndividual<T>,
    params: NodeExchangeCrossoverParams<T>,
  ): Array<ListIndividual<T>> {
    this.setCrossoverIndexes(firstParent, secondParent);
    return super.crossWith(firstParent, secondParent, params);
  }

  /**
   * For each list of both parents, a random index is generated based on the
   * previously calculated range.
   * @param firstParent First individual
   * @param secondParent Second individual
   */
  protected abstract setCrossoverIndexes(firstParent: ListIndividual<T>, secondParent: ListIndividual<T>): void;

  /**
   * Calculates the gene of the corresponding index for the new individuals.
   * @param firstParent First individual
   * @param secondParent Second individual
   * @param params Parameters for the operator
   * @param index Gene to apply the operator
   * @return Object containing the gene for the new individuals.
   */
  protected abstract getGenotypeValues(
    firstParent: ListIndividual<T>,
    secondParent: ListIndividual<T>,
    params: NodeExchangeCrossoverParams<T>,
    index: number,
  ): { first: List<T>; second: List<T> };
}
