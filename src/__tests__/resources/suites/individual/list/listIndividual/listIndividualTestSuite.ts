/*
 * @license
 * Copyright (c) 2021 Cristo Navarro.
 * Copyright (c) 2020 Francisco Cruz.
 * Copyright (c) 2019 Cristian Abrante.
 * All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

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
