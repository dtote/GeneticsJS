/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { List } from '../index';

/**
 * Creates a list that contains nodes with the data specified.
 * @typeparam Type of the elements of the list
 * @param data Array with the elemets to introduce in the list
 * @return List with the specified data.
 */
export function createList<T>(data: T[]): List<T> {
  let newList = new List<T>();
  for (let i = 0; i < data.length; i++) {
    newList.pushBack(data[i]);
  }
  return newList;
}