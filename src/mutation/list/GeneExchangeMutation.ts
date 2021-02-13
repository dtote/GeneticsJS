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
import { UniformMutation, UniformMutationParams as InnerExchangeMutationParams } from './../base';

/**
 * ## Gene Exchange Mutation
 * Class that implements a mutation operator for List Individuals.
 * 
 * This operator is applied to each gene of the genotype and changes one node
 * of the list correspondind to the current gene, with another node from a
 * different gene. Both nodes, and the other gene are chosen randomly.
 */
export class GeneExchangeMutation<T> extends UniformMutation<ListIndividual<T>, List<T>> {
  /**
   * Mutation operator that is applied to the gene in the specified index.
   * The operator swaps a node of the current list with a node from another one.
   * @param individual Individual that the operator is applied on
   * @param index Index of the current gene
   * @param params Operator parameters
   */
  protected mutateGeneUniformly(individual: ListIndividual<T>, index: number, params: InnerExchangeMutationParams): void {
    const currentGene: List<T> = individual.get(index);
    const currentRange: NumericRange = new NumericRange(1, currentGene.length() - 1);
    const currentIndex: number = Generator.generateInteger(currentRange);
    const currentData: T = currentGene.get(currentIndex);
    const individualRange: NumericRange = new NumericRange(0, individual.length() - 1);
    let otherGeneIndex: number = Generator.generateInteger(individualRange);
    while (index === otherGeneIndex) {
      otherGeneIndex = Generator.generateInteger(individualRange);
    }
    const otherGene: List<T> = individual.get(otherGeneIndex);
    const otherRange: NumericRange = new NumericRange(1, otherGene.length() - 1);
    const otherIndex: number = Generator.generateInteger(otherRange);
    const otherData: T = otherGene.get(otherIndex);
    currentGene.swapWith(currentIndex, otherData);
    otherGene.swapWith(otherIndex, currentData);
  }
}