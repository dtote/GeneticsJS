
import ListIndividualMock from './ListIndividualMock';
import * as TestsMock from './data';

interface Mock {
  [key: string]: ListIndividualMock<any>;
}

const mocks: Mock = {
  ...TestsMock,
};

export default mocks;