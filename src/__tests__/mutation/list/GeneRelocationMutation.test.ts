/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { ListIndividual } from '../../../index';
import { GeneRelocationMutation } from '../../../mutation/list';

describe('Gene relocation mutation tests', () => {
  const mutator = new GeneRelocationMutation();
  test('Mutation with 100% probability', () => {
    const params = {
      data: [[2, 3, 4, 5], [4, 5, 6, 9], [0, 3, 9, 2]]
    };
    const individual = new ListIndividual(params);
    let initialNodes = 0;
    for (let gene of individual) {
      initialNodes += gene.length();
    }
    const originalValues: number[][] = [];
    individual.forEach((gene) => originalValues.push(gene.values));
    mutator.mutate(individual, 1.0);
    const newValues: number[][] = [];
    individual.forEach((gene) => newValues.push(gene.values));
    expect(originalValues).not.toEqual(newValues);
    let finalNodes = 0;
    for (let gene of individual) {
      finalNodes += gene.length();
    }
    expect(initialNodes).toEqual(finalNodes);
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