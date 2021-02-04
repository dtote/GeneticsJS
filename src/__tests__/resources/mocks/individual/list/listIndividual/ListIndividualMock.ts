
import { ListIndividual } from '../../../../../../index';
import { ListIndividualParams } from '../../../../../../individual';
import MutableIndividualListMock from './MutableIndividualListMock';

interface ListIndividualMock<T> extends MutableIndividualListMock<ListIndividual<T>, T> {
  testName: string,
  creation: {
    data: ListIndividualParams<T>;
    expected: string;
  };
}

export default ListIndividualMock;
