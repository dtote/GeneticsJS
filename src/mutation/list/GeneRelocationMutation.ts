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
import { NumericRange } from '../../individual';
import { UniformListMutation, ListMutationParams } from './UniformListMutation';

/**
 * ## Gene Relocation Mutation
 * Class that implements a mutation operator for List Individuals.
 *
 * This operator is applied to each gene of the genotype and moves one node
 * of the list corresponding to the current gene, to a different gene. Both the
 * node, and the other gene are chosen randomly.
 */
export class GeneRelocationMutation<T> extends UniformListMutation<T> {
  /**
   * Mutation operator that is applied to the gene in the specified index.
   * The operator moves a node of the current list to another one.
   * @param individual Individual that the operator is applied on
   * @param index Index of the current gene
   * @param params Operator parameters
   */
  protected mutateGeneUniformly(individual: ListIndividual<T>, index: number, params: ListMutationParams): void {
    const currentGene: List<T> = individual.get(index);
    const individualRange: NumericRange = new NumericRange(0, individual.length() - 1);
    let otherGeneIndex: number = Generator.generateInteger(individualRange);
    if (individual.length() > 1) {
      while (index === otherGeneIndex) {
        otherGeneIndex = Generator.generateInteger(individualRange);
      }
    }
    const otherGene: List<T> = individual.get(otherGeneIndex);
    let currentIndex: number = params.initialIndex;
    let otherIndex: number = params.initialIndex;
    if (params.initialIndex <= currentGene.length() - 1 && params.initialIndex <= otherGene.length()) {
      if (params.initialIndex < currentGene.length() - 1) {
        const currentRange: NumericRange = new NumericRange(params.initialIndex, currentGene.length() - 1);
        currentIndex = Generator.generateInteger(currentRange);
      }
      if (params.initialIndex < otherGene.length()) {
        const otherRange: NumericRange = new NumericRange(params.initialIndex, otherGene.length());
        otherIndex = Generator.generateInteger(otherRange);
      }
      const currentData: T = currentGene.get(currentIndex);
      currentGene.erase(currentIndex);
      otherGene.insert(otherIndex, currentData);
    }
  }
}
