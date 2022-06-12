import { Generator } from '../../generator/utils';
import { MutableIndividual } from '../../individual';
import { MutationParams } from './Mutation';
import { MutationBase } from './MutationBase';

export abstract class PolynomialMutation<I extends MutableIndividual<T>, T> extends MutationBase<I, T, MutationParams> {
  public mutate(individual: I, engine = Generator.DEFAULT_ENGINE): void {
    this.mutateWith(individual, { engine });
  }

  protected mutateGene(individual: I, index: number, params: MutationParams): void {
    const mutationProbability = Generator.generateProbability(params.engine);
    this.mutateGenePolynomially(individual, index, mutationProbability, params);
  }

  protected abstract mutateGenePolynomially(
    individual: I,
    index: number,
    mutationProbability: number,
    params: MutationParams,
  ): void;
}
