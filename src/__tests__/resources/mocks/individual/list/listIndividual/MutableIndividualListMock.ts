
import { MutableIndividual } from '../../../../../../index';
import { List } from '../../../../../../index';
import BaseIndividualMock from '../../base/BaseIndividualMock';

interface CopyMethods<I extends MutableIndividual<List<T>>, T> {
  change: Array<{
    geneIndex: number;
    gene: T;
  }>;
  other: I;
}

interface MutableIndividualListMock<I extends MutableIndividual<List<T>>, T> extends BaseIndividualMock<I, List<T>> {
  copy?: Array<CopyMethods<I, T>>;
  deepCopy?: Array<CopyMethods<I, T>>;
  copyWithin?: Array<{
    params: {
      target: number;
      start?: number;
      end?: number;
    };
    expected: T[];
  }>;
  fill?: Array<{
    params: {
      gene: T;
      start?: number;
      end?: number;
    };
    expected: T[];
  }>;
  map?: Array<{
    callback: (gene: T, geneIndex?: number, genotype?: T[]) => T;
    expected: T[];
  }>;
  reverse?: {
    expected: T[];
  };
  set?: Array<{
    params: {
      geneIndex: number;
      gene: T;
    };
  }>;
}

export default MutableIndividualListMock;
