
import { Generator } from '../../generator/utils';
import { ListIndividual } from '../../index';
import { List } from '../../index';
import { UniformMutationParams, MutationBase } from '../base';

export interface ListMutationParams extends UniformMutationParams {
  initialIndex: number;
}

export abstract class UniformListMutation<T> extends MutationBase<ListIndividual<T>, List<T>, ListMutationParams> {
  private static checkMutationRate(mutationRate: number) {
    if (!Generator.probabilityIsValid(mutationRate)) {
      throw new Error(`Error: Mutation rate ${mutationRate} is not in range [0.0 - 1.0]`);
    }
  }

  private static checkInitialIndex(initialIndex: number) {
    if (initialIndex < 0) {
      throw new Error(`Error: Initial index ${initialIndex} can't be smaller than 0.`)
    }
  }

  public mutate(individual: ListIndividual<T>, mutationRate = 0.5, initialIndex = 0, engine = Generator.DEFAULT_ENGINE): void {
    this.mutateWith(individual, { mutationRate, engine, initialIndex });
  }

  public mutateWith(individual: ListIndividual<T>, params: ListMutationParams): void {
    UniformListMutation.checkInitialIndex(params.initialIndex);
    UniformListMutation.checkMutationRate(params.mutationRate);
    super.mutateWith(individual, params);
  }

  protected mutateGene(individual: ListIndividual<T>, index: number, params: ListMutationParams): void {
    const threshold = Generator.generateProbability(params.engine);
    if (threshold <= params.mutationRate) {
      this.mutateGeneUniformly(individual, index, params);
    }
  }

  protected abstract mutateGeneUniformly(individual: ListIndividual<T>, index: number, params: UniformMutationParams): void;
}