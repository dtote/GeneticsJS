import { MixedIndividual } from '../../individual/numeric/mixed';
import { Population } from '../../population/Population';
import { Builder } from '../builders/Builder';
import { RangeI } from '../interfaces/RangeI';

export class Generator {
  static generateRandomFloatFromRange(range: RangeI) {
    return Math.random() * (range.upper - range.lower) + range.lower;
  }

  static generateRandomIntegerFromRange(range: RangeI) {
    return Math.floor(Math.random() * (range.upper - range.lower)) + range.lower;
  }

  static generatePopulation(number_of_individuals: number): Population<MixedIndividual, number> {
    const population = new Population<MixedIndividual, number>();
    for (let index = 0; index < number_of_individuals; index++) {
      const parameters = Builder.candidateParameters();
      const newIndividual = new MixedIndividual(parameters);
      population.pushIndividual(newIndividual);
    }

    return population;
  }

  static generateDockerInstances(number_of_instances = 60): string[] {
    const instances = [];

    for (let index = 0; index < number_of_instances; index++) {
      const parameters = Builder.candidateParameters();
      const instance = Builder.dockerInstance(parameters);

      instances.push(instance);
    }

    return instances;
  }

  static generateRscriptInstances(number_of_instances = 60): string[] {
    const instances = [];

    for (let index = 0; index < number_of_instances; index++) {
      const parameters = Builder.candidateParameters();
      const instance = Builder.rscriptInstance(parameters);

      instances.push(instance);
    }

    return instances;
  }
}
