/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { ListIndividual } from '../../../index';
import { InnerExchangeMutation } from '../../../mutation/list';

describe('Inner exchange mutation tests', () => {
  const mutator = new InnerExchangeMutation();
  test('Mutation with 100% probability', () => {
    const params = {
      data: [[2, 3, 4, 5], [4, 5, 6, 9], [0, 3, 9, 2]]
    };
    const individual = new ListIndividual(params);
    const originalValues: number[][] = [];
    individual.forEach((gene) => originalValues.push(gene.values));
    mutator.mutate(individual, 1.0);
    const newValues: number[][] = [];
    individual.forEach((gene) => newValues.push(gene.values));
    expect(originalValues).not.toEqual(newValues);
    for (let i = 0; i < originalValues.length; i++) {
      originalValues[i].sort();
      newValues[i].sort();
      expect(originalValues[i]).toEqual(newValues[i]);
    }
  });
  test('Mutation with 10% probability', () => {
    const params = {
      data: [[2, 3, 4, 5], [4, 5, 6, 9], [0, 3, 9, 2]]
    };
    const individual = new ListIndividual(params);
    const originalValues: number[][] = [];
    individual.forEach((gene) => originalValues.push(gene.values));
    mutator.mutate(individual, 0.0);
    const newValues: number[][] = [];
    individual.forEach((gene) => newValues.push(gene.values));
    expect(originalValues).toEqual(newValues);
  });
});