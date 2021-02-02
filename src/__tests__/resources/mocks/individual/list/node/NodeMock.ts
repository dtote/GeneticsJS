
import { Node } from '../../../../../../index';

interface NodeMock<T> {
  creation: {
    data: T;
    next: null;
  };
  newData?: T;
  data?: T;
  newNode?: T;
  next?: NodeMock<T> | null;
}

export default NodeMock;