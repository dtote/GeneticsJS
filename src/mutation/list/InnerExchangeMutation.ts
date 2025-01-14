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
import { ListMutationParams, UniformListMutation } from './UniformListMutation';

/**
 * ## Inner Exchange Mutation
 * Class that implements a mutation operator for List Individuals.
 *
 * This operator is applied to each gene of the genotype and swaps two nodes
 * chosen randomly from the current gene.
 */
export class InnerExchangeMutation<T> extends UniformListMutation<T> {
  /**
   * Mutation operator that is applied to the gene in the specified index.
   * The operator swaps two nodes of the current list.
   * @param individual Individual that the operator is applied on
   * @param index Index of the current gene
   * @param params Operator parameters
   */
  protected mutateGeneUniformly(individual: ListIndividual<T>, index: number, params: ListMutationParams): void {
    const gene: List<T> = individual.get(index);
    if (gene.length() > 1 && params.initialIndex < gene.length() - 1) {
      const range: NumericRange = new NumericRange(params.initialIndex, gene.length() - 1);
      const firstIndex: number = Generator.generateInteger(range);
      let secondIndex: number = Generator.generateInteger(range);
      if (gene.length() > 1) {
        while (secondIndex === firstIndex) {
          secondIndex = Generator.generateInteger(range);
        }
      }
      gene.swap(firstIndex, secondIndex);
    }
  }
}
