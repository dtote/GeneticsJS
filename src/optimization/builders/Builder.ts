import path from 'path';
import { NUMBER_OF_PARAMS } from '../constants/NumberOfParams';
import { RANGES } from '../constants/Ranges';
import { Generator } from '../generators/Generator';
import { CandidateSolution } from '../interfaces/CandidateSolution';
import { RangeI } from '../interfaces/RangeI';
import { extractParametersFromDockerInstance } from '../utils/ExtractParametersFromDockerInstance';
import { isIntegerRange } from '../utils/isIntegerRange';

const RSCRIPT_COMMAND = `Rscript ${path.join(
  __dirname,
  '..',
  '..',
  '..',
  'src/optimization/scripts/BabsimHospital.R',
)}`;
const DOCKER_COMMAND = "docker run --rm mrebolle/r-geccoc:Track1 -c 'Rscript objfun.R";

export class Builder {
  constructor(private readonly dockerCmd = DOCKER_COMMAND, private readonly rsriptCmd = RSCRIPT_COMMAND) {}

  // parameters builder methods
  static candidateParameters(number_of_params = NUMBER_OF_PARAMS, ranges: RangeI[] = RANGES) {
    const candidate = [];

    for (let index = 0; index < number_of_params; index++) {
      if (isIntegerRange(ranges[index])) {
        candidate.push(Generator.generateRandomIntegerFromRange(ranges[index]));
      } else {
        candidate.push(Generator.generateRandomFloatFromRange(ranges[index]));
      }
    }

    return candidate;
  }

  // docker builder methods
  static dockerInstance(parameters: number[]): string {
    const joinedParameters = parameters.join(',');
    const instance = `${DOCKER_COMMAND} '${joinedParameters}' '`;

    return instance;
  }

  static dockerCandidate(instance: string, executionBuffer: Buffer): CandidateSolution {
    const parameters = extractParametersFromDockerInstance(instance);
    const output = Number(executionBuffer.toString());

    return { parameters, output };
  }

  // rscript builder methods
  static rscriptInstance(parameters: number[]): string {
    const joinedParameters = parameters.join(' ');
    const instance = `${RSCRIPT_COMMAND} ${joinedParameters}`;

    return instance;
  }
}
