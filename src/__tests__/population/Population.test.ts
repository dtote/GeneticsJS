/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { IntegerIndividual } from '../../individual';
import { Population } from '../../population';

describe('Population tests', () => {
  const individuals = [5, 2, 8];
  let population = new Population<IntegerIndividual, number>();
  const populationInitializer = () => {
    individuals.forEach(individual => population.pushIndividual(new IntegerIndividual([individual]), individual));
  };

  test('Selecting the best individual in a maximization problem', () => {
    population = new Population<IntegerIndividual, number>();
    populationInitializer();
    expect(population.populationStatistics.fittestIndividualIndex).toEqual(2);
  });

  test('Selecting the best individual in a minimization problem', () => {
    population = new Population<IntegerIndividual, number>(
      (currentBestFitness, newFitness) => newFitness < currentBestFitness,
    );
    populationInitializer();
    expect(population.populationStatistics.fittestIndividualIndex).toEqual(1);
  });
});
