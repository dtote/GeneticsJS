import { Generator } from '../../generator/utils';
import { MutableIndividual, NumericRange } from '../../individual';
import { MutationParams } from './Mutation';
import { MutationBase } from './MutationBase';

export interface PolynomialMutationParams extends MutationParams {
  delta?: number;
}

export abstract class PolynomialMutation<I extends MutableIndividual<T>, T> extends MutationBase<
  I,
  T,
  PolynomialMutationParams
> {
  public mutate(individual: I, engine = Generator.DEFAULT_ENGINE): void {
    this.mutateWith(individual, { engine });
  }

  protected mutateGene(individual: I, index: number, params: PolynomialMutationParams): void {
    const randomNumberBetween0and1 = Generator.generateProbability(params.engine);
    const perturbation = Generator.generateFloating(new NumericRange(20, 100));

    if (randomNumberBetween0and1 > 0.5) {
      const deltaRight = Math.abs(1 - Math.pow(2 * (1 - randomNumberBetween0and1), 1 / (1 + perturbation)));
      this.mutateGenePolynomially(individual, index, { ...params, delta: deltaRight });
    } else {
      const deltaLeft = Math.abs(Math.pow(2 * randomNumberBetween0and1, 1 / (1 + perturbation)) - 1);
      this.mutateGenePolynomially(individual, index, { ...params, delta: deltaLeft });
    }
  }

  protected abstract mutateGenePolynomially(individual: I, index: number, params: PolynomialMutationParams): void;
}
