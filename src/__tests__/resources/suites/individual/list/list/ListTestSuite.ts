/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { List } from '../../../../../../index';
import ListMock from '../../../../mocks/individual/list/list/ListMock';

const listTestSuite = (listTest: ListMock<any>) => {
  describe('List test suite.', () => {
    const { data, expectedLength, expectedHead } = listTest.creation;
    let list: List<any>;

    const resetList = () => {
      list = new List(data);
      if (listTest.creation.nodes !== undefined) {
        for (const nodeData of listTest.creation.nodes) {
          list.pushBack(nodeData);
        }
      }
    };

    beforeEach(() => {
      resetList();
    });

    test('Creation test', () => {
      expect(list.front).toEqual(expectedHead);
      expect(list.length()).toEqual(expectedLength);
    });

    if (listTest.values !== undefined) {
      test('Values list test', () => {
        const values = list.values;
        expect(values).toEqual(listTest.values);
      });
    }

    if (listTest.front !== undefined) {
      test('Front list test', () => {
        expect(list.front).toEqual(listTest.front);
      });
    }

    if (listTest.back !== undefined) {
      test('Back list test', () => {
        expect(list.back).toEqual(listTest.back);
      });
    }

    if (listTest.empty !== undefined) {
      test('Empty list test', () => {
        expect(list.empty()).toEqual(listTest.empty);
      });
    }

    if (listTest.get !== undefined) {
      test('Get list test', () => {
        for (let getParams of listTest.get!) {
          if (getParams.expected === null) {
            expect(() => list.get(getParams.index)).toThrow(Error);
          } else {
            expect(list.get(getParams.index)).toEqual(getParams.expected);
          }
        }
      });
    }

    if (listTest.pushFront !== undefined) {
      test('PushFront list test', () => {
        list.pushFront(listTest.pushFront!.data);
        expect(list.values).toEqual(listTest.pushFront!.expected);
      });
    }

    if (listTest.popFront !== undefined) {
      test('PopFront list test', () => {
        for (const popParams of listTest.popFront!) {
          if (popParams.error) {
            expect(() => list.popFront()).toThrow(Error);
          } else {
            list.popFront();
            expect(list.values).toEqual(popParams.expected);
          }
        }
      });
    }

    if (listTest.pushBack !== undefined) {
      test('PushBack list test', () => {
        list.pushBack(listTest.pushBack!.data);
        expect(list.values).toEqual(listTest.pushBack!.expected);
      });
    }

    if (listTest.popBack !== undefined) {
      test('PopBack list test', () => {
        for (const popParams of listTest.popBack!) {
          if (popParams.error) {
            expect(() => list.popBack()).toThrow(Error);
          } else {
            list.popBack();
            expect(list.values).toEqual(popParams.expected);
          }
        }
      });
    }

    if (listTest.insert !== undefined) {
      test('Insert list test', () => {
        for (const insertParams of listTest.insert!) {
          if (insertParams.error) {
            expect(() => list.insert(insertParams.pos, insertParams.data)).toThrow(Error);
          } else {
            list.insert(insertParams.pos, insertParams.data);
            expect(list.values).toEqual(insertParams.expected);
          }
        }
      });
    }

    if (listTest.erase !== undefined) {
      test('Erase list test', () => {
        for (const eraseParams of listTest.erase!) {
          if (eraseParams.error) {
            expect(() => list.erase(eraseParams.pos)).toThrow(Error);
          } else {
            list.erase(eraseParams.pos);
            expect(list.values).toEqual(eraseParams.expected);
          }
        }
      });
    }

    if (listTest.every !== undefined) {
      test('Every list test', () => {
        for (const everyParams of listTest.every!) {
          expect(list.every(everyParams.callback)).toEqual(everyParams.expected);
        }
      });
    }

    if (listTest.find !== undefined) {
      test('Find list test', () => {
        for (const findParams of listTest.find!) {
          expect(list.find(findParams.callback)).toEqual(findParams.expected);
        }
      });
    }

    if (listTest.findIndex !== undefined) {
      test('FindIndex list test', () => {
        for (const findParams of listTest.findIndex!) {
          expect(list.findIndex(findParams.callback)).toEqual(findParams.expected);
        }
      });
    }

    if (listTest.includes !== undefined) {
      test('Includes list test', () => {
        for (const includesParams of listTest.includes!) {
          expect(list.includes(includesParams.data)).toEqual(includesParams.expected);
        }
      });
    }

    if (listTest.indexOf !== undefined) {
      test('IndexOf list test', () => {
        for (const indexParams of listTest.indexOf!) {
          expect(list.indexOf(indexParams.data)).toEqual(indexParams.expected);
        }
      });
    }

    if (listTest.lastIndexOf !== undefined) {
      test('LastIndexOf list test', () => {
        for (const indexParams of listTest.lastIndexOf!) {
          expect(list.lastIndexOf(indexParams.data)).toEqual(indexParams.expected);
        }
      });
    }

    if (listTest.some !== undefined) {
      test('Some list text', () => {
        for (const someParams of listTest.some!) {
          expect(list.some(someParams.callback)).toEqual(someParams.expected);
        }
      });
    }

    if (listTest.forEach !== undefined) {
      test('ForEach list test', () => {
        list.forEach(listTest.forEach!.callback);
        expect(list.values).toEqual(listTest.forEach!.expected);
      });
    }

    if (listTest.toStringTest !== undefined) {
      test('ToString list test', () => {
        expect(list.toString()).toEqual(listTest.toStringTest);
      });
    }

    if (listTest.swap !== undefined) {
      test('Swap list test', () => {
        for (let i = 0; i < listTest.swap!.length; i++) {
          const { firstIndex, secondIndex, expected, error } = listTest.swap![i];
          if (error) {
            expect(() => list.swap(firstIndex, secondIndex)).toThrow(Error);
          } else {
            list.swap(firstIndex, secondIndex);
            expect(list.values).toEqual(expected);
          } 
        }
      });
    }
  });
};

export default listTestSuite;
