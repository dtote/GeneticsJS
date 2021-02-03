
import ListMock from '../ListMock';

const I: ListMock<number> = {
  testName: 'Get Test',
  creation: {
    data: 4,
    expectedLength: 7,
    expectedHead: 4,
    nodes: [3, 4, 5, 6, 7, 8]
  },
  values: [4, 3, 4, 5, 6, 7, 8],
  get: [
    {
      index: 3,
      expected: 5
    },
    {
      index: 0,
      expected: 4
    },
    {
      index: 6,
      expected: 8
    },
    {
      index: 8,
      expected: null
    },
    {
      index: -2,
      expected: null
    }
  ]
};

export default I;