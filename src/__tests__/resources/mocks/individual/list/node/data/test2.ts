
import NodeMock from '../NodeMock';

const N: NodeMock<String> = {
  creation: {
    data: 'nuevoNodo',
    next: null,
  }
};

const I: NodeMock<String> = {
  creation: {
    data: 'nodo',
    next: null
  },
  newData: 'nuevo',
  data: 'nuevo',
  newNode: 'nuevoNodo',
  next: N
};

export default I;
