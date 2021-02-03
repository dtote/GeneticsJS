import ListMock from '../ListMock';

interface customObject {
  data: number
}

const I: ListMock<customObject> = {
  testName: 'ForEach Test',
  creation: {
    data: undefined,
    expectedLength: 2,
    expectedHead: {data: 2},
    nodes: [{data: 2}, {data: 4}]
  },
  forEach: {
    expected: [{data: 6}, {data: 12}],
    callback: (x) => {
      x.data = x.data * 3;
    }
  }
};

export default I;