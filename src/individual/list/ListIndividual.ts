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

export interface ListIndividualParams<T> {
  data: Array<Array<T>>;
}

export class ListIndividual<T> extends MutableIndividual<List<T>> {
  constructor(creationParams: ListIndividualParams<T>) {
    super([]);
    for (let currentList = 0; currentList < creationParams.data.length; currentList++) {
      this.genotype.push(new List<T>());
      for (let currentNode = 0; currentNode < creationParams.data[currentList].length; currentNode++) {
        this.genotype[currentList].pushBack(creationParams.data[currentList][currentNode]);
      }
    }
  }

  public deepCopy(other: MutableIndividual<List<T>>): void {
    this.setGenotype(Array.from(other.genotype));
  }

  protected geneToString(gene: List<T>): string {
    if (gene.toString !== undefined && typeof gene.toString === 'function') {
      return gene.toString();
    } else {
      throw new Error("Can't convert gene to String.");
    }
  }
}
