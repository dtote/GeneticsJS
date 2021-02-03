
import ListMock from '../ListMock';

const I: ListMock<number> = {
  testName: 'Creation Test',
  creation: {
    data: 4,
    expectedLength: 1,
    expectedHead: 4
  },
  values: [4],
  front: 4,
  back: 4,
  empty: false
};

export default I;