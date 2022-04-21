import { MixedIndividual } from '../../../individual/numeric/mixed';
import { PARAMS_LOWER_BOUNDS } from '../../../optimization/constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../../../optimization/constants/UpperBounds';
import { PolynomialMutation, PolynomialMutationParams } from '../../base/PolynomialMutation';

export class MixedPolynomialMutation extends PolynomialMutation<MixedIndividual, number> {
  protected mutateGenePolynomially(individual: MixedIndividual, index: number, params: PolynomialMutationParams): void {
    // Aqui ya el individuo viene con el valor mal, porque si peta,
    // es porque sus rangos no están bien establecidos
    const calculatedGene = individual.get(index) + params.delta!;
    console.log({ calculatedGene });

    console.log({ withDelta: params.delta });
    console.log({ inRange: individual.range });
    const isGeneInRange = calculatedGene % PARAMS_UPPER_BOUNDS[index] >= PARAMS_LOWER_BOUNDS[index];
    const newGene = isGeneInRange ? calculatedGene : calculatedGene + PARAMS_LOWER_BOUNDS[index];
    console.log({ individualRange: individual.range });
    individual.set(index, newGene);
    individual.range.set(PARAMS_LOWER_BOUNDS[index], PARAMS_UPPER_BOUNDS[index]);
  }
}
