
import ListMock from '../ListMock';

const I: ListMock<number> = {
  testName: 'Insertions Tests',
  creation: {
    data: 4,
    expectedLength: 7,
    expectedHead: 4,
    nodes: [3, 4, 5, 6, 7, 8]
  },
  values: [4, 3, 4, 5, 6, 7, 8],
  pushFront: {
    data: 0,
    expected: [0, 4, 3, 4, 5, 6, 7, 8]
  },
  pushBack: {
    data: -3,
    expected: [4, 3, 4, 5, 6, 7, 8, -3]
  },
  insert: [
    {
      pos: 0,
      data: 2,
      expected: [2, 4, 3, 4, 5, 6, 7, 8]
    },
    {
      pos: 8,
      data: 1,
      expected: [2, 4, 3, 4, 5, 6, 7, 8, 1]
    },
    {
      pos: -2,
      data: 1,
      error: true,
      expected: []
    },
    {
      pos: 12,
      data: 1,
      error: true,
      expected: []
    }
  ]
};

export default I;