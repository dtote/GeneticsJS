/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

export function isEqual(firstItem: any, secondItem: any): boolean {
  if (firstItem === secondItem) {
    return true;
  }
  if (typeof firstItem === 'object' && typeof secondItem === 'object') {
    for (const property in firstItem) {
      if (firstItem[property] === secondItem[property]) {
        continue;
      }
      if (firstItem.hasOwnProperty(property) && secondItem.hasOwnProperty(property)) {
        if (!isEqual(firstItem[property], secondItem[property])) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}
