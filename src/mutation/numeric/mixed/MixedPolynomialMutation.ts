import { Generator } from '../../../generator/utils';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { PARAMS_LOWER_BOUNDS } from '../../../optimization/constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../../../optimization/constants/UpperBounds';
import { MutationParams, PolynomialMutation } from '../../base';

const RAND_MAX = 2 ** 53;

export class MixedPolynomialMutation extends PolynomialMutation<MixedIndividual, number> {
  protected mutateGenePolinomially(
    individual: MixedIndividual,
    index: number,
    mutationProbability: number,
    params: MutationParams,
  ): void {
    const n = 20; // distribution index
    let delta, rnd, deltaq, mu, temp;

    const vmut = Generator.generateProbability(params.engine) / RAND_MAX;

    if (vmut < mutationProbability) {
      if (individual.get(index) - PARAMS_LOWER_BOUNDS[index] < PARAMS_UPPER_BOUNDS[index] - individual.get(index)) {
        delta =
          (individual.get(index) - PARAMS_LOWER_BOUNDS[index]) /
          (PARAMS_UPPER_BOUNDS[index] - PARAMS_LOWER_BOUNDS[index]);
      } else {
        delta =
          (PARAMS_UPPER_BOUNDS[index] - individual.get(index)) /
          (PARAMS_UPPER_BOUNDS[index] - PARAMS_LOWER_BOUNDS[index]);
      }
      rnd = Generator.generateProbability(params.engine) / RAND_MAX;
      mu = 1.0 / n;
      if (rnd <= 0.5) {
        const xy = 1.0 - delta;
        temp = 2 * rnd + (1 - 2 * rnd) * Math.pow(xy, n + 1);
        deltaq = Math.pow(temp, mu) - 1.0;
      } else {
        const xy = 1.0 - delta;
        temp = 2.0 * (1.0 - rnd) + 2.0 * (rnd - 0.5) * Math.pow(xy, n + 1);
        deltaq = 1.0 - Math.pow(temp, mu);
      }
      individual.set(index, individual.get(index) + deltaq * (PARAMS_UPPER_BOUNDS[index] - PARAMS_LOWER_BOUNDS[index]));
      if (individual.get(index) > PARAMS_UPPER_BOUNDS[index]) {
        individual.set(index, PARAMS_UPPER_BOUNDS[index]);
      }
      if (individual.get(index) < PARAMS_LOWER_BOUNDS[index]) {
        individual.set(index, PARAMS_LOWER_BOUNDS[index]);
      }
    }
  }
}
