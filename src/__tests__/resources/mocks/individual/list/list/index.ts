
import ListMock from './ListMock';
import * as TestsMock from './data';

interface Mock {
  [key: string]: ListMock<any>;
}

const mocks: Mock = {
  ...TestsMock,
};

export default mocks;