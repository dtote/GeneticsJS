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
import { MutationBase, UniformMutationParams } from '../base';

/**
 * ## List Mutation Params
 * Interface that defines the parameters for a mutation operator that is
 * applied to a ListIndividual.
 *
 * Aside from the engine to generate random numbers and the mutation rate, it
 * includes an initial index to apply the operator to each list.
 */
export interface ListMutationParams extends UniformMutationParams {
  initialIndex: number;
}

/**
 * ## Uniform List Mutation
 * Base class for mutation operators that are applied to every gene in the
 * ListIndividual.
 *
 * It includes methods to apply the operator to each gene based on a mutation
 * rate, but to define an operator, the method mutateGeneUniformly must be
 * implemented.
 */
export abstract class UniformListMutation<T> extends MutationBase<ListIndividual<T>, List<T>, ListMutationParams> {
  /**
   * Checks if the mutation rate is in range [0.0 - 1.0] and throws an error if
   * it's outside that range.
   * @param mutationRate Mutation rate of the operator
   */
  private static checkMutationRate(mutationRate: number) {
    if (!Generator.probabilityIsValid(mutationRate)) {
      throw new Error(`Error: Mutation rate ${mutationRate} is not in range [0.0 - 1.0]`);
    }
  }

  /**
   * Checks if the index is a positive number, and if it isn't, throws an error.
   * @param initialIndex Initial index for the lists
   */
  private static checkInitialIndex(initialIndex: number) {
    if (initialIndex < 0) {
      throw new Error(`Error: Initial index ${initialIndex} can't be smaller than 0.`);
    }
  }

  /**
   * Mutate the especified individual with the given parameters.
   * @param individual Individual to apply the mutation
   * @param mutationRate Rate for the mutation to happen
   * @param initialIndex Initial index for the lists
   * @param engine Generator of random numbers
   */
  public mutate(
    individual: ListIndividual<T>,
    mutationRate = 0.5,
    initialIndex = 0,
    engine = Generator.DEFAULT_ENGINE,
  ): void {
    this.mutateWith(individual, { mutationRate, engine, initialIndex });
  }

  /**
   * Mutate the especified individual with the given parameters.
   * @param individual Individual to apply the mutation
   * @param params Parameters for the operator
   */
  public mutateWith(individual: ListIndividual<T>, params: ListMutationParams): void {
    UniformListMutation.checkInitialIndex(params.initialIndex);
    UniformListMutation.checkMutationRate(params.mutationRate);
    super.mutateWith(individual, params);
  }

  /**
   * Applies the mutation operator to the especified gene of the given
   * individual within a certain probability.
   * @param individual Individual to apply the mutation
   * @param index Index of the gene where the mutation is applied
   * @param params Parameters for the mutation
   */
  protected mutateGene(individual: ListIndividual<T>, index: number, params: ListMutationParams): void {
    const threshold = Generator.generateProbability(params.engine);
    if (threshold <= params.mutationRate) {
      this.mutateGeneUniformly(individual, index, params);
    }
  }

  /**
   * Applies the mutation operator to the specified gene of the given
   * individual.
   * @param individual Individual to apply the mutation
   * @param index Index of the gene where the mutation is applied
   * @param params Parameters for the mutation
   */
  protected abstract mutateGeneUniformly(
    individual: ListIndividual<T>,
    index: number,
    params: UniformMutationParams,
  ): void;
}
