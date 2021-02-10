/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { MutableIndividual } from '../base';
import { List } from './List';


/**
 * ## List Individual Params
 * Simple interface that specifies the format of the parameters needed to create
 * a ListIndividual.
 * 
 * The data must be given as an array of arrays. Each of the inner arrays
 * represents the data of a list.
 * 
 * @typeparam T type of the data for the lists of the individual.
 */
export interface ListIndividualParams<T> {
  data: Array<Array<T>>;
}

/**
 * ## List Individual
 * List Individual is a individual where all the genes in the genotype are
 * simple linked lists.
 * @typeparam T type of the data of the lists nodes
 */
export class ListIndividual<T> extends MutableIndividual<List<T>> {
  /**
   * Constructor of the class.
   * Takes the data given and creates the corresponding lists, inserting the
   * needed data in each of them.
   * @param creationParams Initial data for the lists
   */
  constructor(creationParams: ListIndividualParams<T>) {
    super([]);
    for (let currentList = 0; currentList < creationParams.data.length; currentList++) {
      this.genotype.push(new List<T>());
      for (let currentNode = 0; currentNode < creationParams.data[currentList].length; currentNode++) {
        this.genotype[currentList].pushBack(creationParams.data[currentList][currentNode]);
      }
    }
  }

  /**
   * Creates a deep copy of the other individual in the current individual.
   * @param other Individual to copy
   */
  public deepCopy(other: MutableIndividual<List<T>>): void {
    this.setGenotype(Array.from(other.genotype));
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
