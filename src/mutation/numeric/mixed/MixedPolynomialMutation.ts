import { Generator } from '../../../generator/utils';
import { NumericRange } from '../../../individual';
import { MixedIndividual } from '../../../individual/numeric/mixed';
import { PARAMS_LOWER_BOUNDS } from '../../../optimization/constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../../../optimization/constants/UpperBounds';
import { MutationParams, PolynomialMutation } from '../../base';

const RAND_MAX = 2 ** 53;

export class MixedPolynomialMutation extends PolynomialMutation<MixedIndividual, number> {
  protected mutateGenePolynomially(
    individual: MixedIndividual,
    index: number,
    mutationProbability: number,
    params: MutationParams,
  ): void {
    const n = 20; // distribution index
    let delta, rnd, deltaq, mu, temp;

    const lowerBound = PARAMS_LOWER_BOUNDS[index];
    const upperBound = PARAMS_UPPER_BOUNDS[index];

    const vmut = Generator.generateProbability(params.engine) / RAND_MAX;
    if (vmut < mutationProbability) {
      if (individual.get(index) - lowerBound < upperBound - individual.get(index)) {
        delta = (individual.get(index) - lowerBound) / (upperBound - lowerBound);
      } else {
        delta = (upperBound - individual.get(index)) / (upperBound - lowerBound);
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

      const newGene = individual.get(index) + deltaq * (upperBound - lowerBound);
      const normalizedGene = NumericRange.normalizeValueToRange(newGene, new NumericRange(lowerBound, upperBound));

      individual.set(index, normalizedGene);

      if (individual.get(index) > upperBound) {
        individual.set(index, upperBound);
      }

      if (individual.get(index) < lowerBound) {
        individual.set(index, lowerBound);
      }
    }
  }
}
