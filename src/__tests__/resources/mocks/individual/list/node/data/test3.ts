
import NodeMock from '../NodeMock';

const N: NodeMock<Number> = {
  creation: {
    data: 34,
    next: null,
  }
};

const I: NodeMock<Number> = {
  creation: {
    data: 0,
    next: null
  },
  newData: -3,
  data: -3,
  newNode: 34,
  next: N
};

export default I;