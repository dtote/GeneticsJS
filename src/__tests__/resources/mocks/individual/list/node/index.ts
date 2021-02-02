
import NodeMock from './NodeMock';
import * as TestsMock from './data';

interface Mock {
  [key: string]: NodeMock<any>;
}

const mocks: Mock = {
  ...TestsMock,
};

export default mocks;