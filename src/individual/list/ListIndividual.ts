/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { cloneDeep } from 'lodash';
import { MutableIndividual } from '../base';
import { List } from './List';

/**
 * ## List Individual
 * List Individual is a individual where all the genes in the genotype are
 * simple linked lists.
 * @typeparam T type of the data of the lists nodes
 */
export class ListIndividual<T> extends MutableIndividual<List<T>> {
  /**
   * Constructor of the class.
   * Initializes the genotype of the individual with the given lists.
   * @param creationParams Initial genotype for the individual
   */
  constructor(genotype: Array<List<T>>) {
    super(Array.from(genotype));
  }

  /**
   * Creates a deep copy of the other individual in the current individual.
   * @param other Individual to copy
   */
  public deepCopy(other: MutableIndividual<List<T>>): void {
    this.setGenotype(cloneDeep(other.genotype));
  }

  /**
   * Converts a gene into a string. If the gene can't be converted, it throws an
   * error.
   * @param gene Gene to convert into a string
   * @return String that represents the gene.
   */
  protected geneToString(gene: List<T>): string {
    if (gene.toString !== undefined && typeof gene.toString === 'function') {
      return gene.toString();
    } else {
      throw new Error("Can't convert gene to String.");
    }
  }
}
