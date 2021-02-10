/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Node } from '../../../../../../index';
import NodeMock from '../../../../mocks/individual/list/node/NodeMock';

const nodeNumberTestSuite = (nodeTest: NodeMock<any>) => {
  describe('Node test suite', () => {
    test('Creation test', () => {
      const { data, next } = nodeTest.creation;
      const node = new Node(data);
      expect(node.data).toEqual(data);
      expect(node.next).toEqual(next);
    });

    if (nodeTest.newData !== undefined) {
      test('Update node data test', () => {
        const { data, next } = nodeTest.creation;
        const newData = nodeTest.newData;
        const node = new Node(data);
        node.data = newData;
        expect(node.data).toEqual(newData);
      });
    }

    if (nodeTest.newNode !== undefined) {
      test('Connect new Node test', () => {
        const { data, next } = nodeTest.creation;
        const newNodeData = nodeTest.newNode;
        const node = new Node(data);
        node.next = new Node(newNodeData);
        expect(node.next.data).toEqual(newNodeData);
      });
    }
  });
};

export default nodeNumberTestSuite;
