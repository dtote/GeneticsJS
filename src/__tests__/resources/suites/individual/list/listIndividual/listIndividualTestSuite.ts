
import { ListIndividual } from '../../../../../../index';
import ListIndividualMock from '../../../../mocks/individual/list/listIndividual/ListIndividualMock';

const listIndividualTestSuite = (listIndividualTest: ListIndividualMock<any>) => {
  describe('ListIndividual tests', () => {
    test('Creation test', () => {
      const individual = new ListIndividual(listIndividualTest.creation.data);
      expect(individual.toString()).toEqual(listIndividualTest.creation.expected);
      expect(individual.genotype).toEqual(listIndividualTest.expectedGenotype);
    });
  });
};

export default listIndividualTestSuite;