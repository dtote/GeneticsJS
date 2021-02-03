
import { List } from '../../../index';

import ListTestSuite from '../../resources/suites/individual/list/list/ListTestSuite';

import ListMock from '../../resources/mocks/individual/list/list/ListMock';
import ListTestMocks from '../../resources/mocks/individual/list/list';

Object.keys(ListTestMocks).forEach(key => {
  const test = ListTestMocks[key];
  describe(`${test.testName} for Lists`, () => {
    ListTestSuite(test);
  });
});