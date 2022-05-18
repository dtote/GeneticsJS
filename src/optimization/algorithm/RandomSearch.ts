import { Calculator } from '../calculator/Calculator';
import { DockerCommand } from '../commands/DockerCommand';
import { RscriptCommand } from '../commands/RscriptCommand';
import { Generator } from '../generators/Generator';
import { CandidateSolution } from '../interfaces/CandidateSolution';
import { ExecutionEngine } from '../types/enums/ExecutionEngine';
import { AlgorithmResponse } from '../types/interfaces/AlgorithmResponse';
import { RandomSearchParams } from '../types/interfaces/RandomSearchParams';
import { isLower } from '../utils/isLower';

export function randomSearch(params: RandomSearchParams): AlgorithmResponse {
  const { engine, numberOfIterations, numberOfReplics } = params;

  const numberOfInstances = numberOfIterations;

  const instances =
    engine === ExecutionEngine.DOCKER
      ? DockerCommand.generate(numberOfInstances)
      : RscriptCommand.generate(numberOfInstances);

  let bestCandidate = {
    parameters: [],
    output: Number.MAX_SAFE_INTEGER,
  } as CandidateSolution;

  for (let index = 0; index < numberOfIterations; index++) {
    const randomNumber = Generator.randomIntegerFromRange({
      lower: 0,
      upper: instances.length - 1,
    });

    const replics = [];
    for (let j = 0; j < numberOfReplics; j++) {
      const selectedCandidate =
        engine === ExecutionEngine.DOCKER
          ? DockerCommand.run(instances[randomNumber])
          : RscriptCommand.run(instances[randomNumber]);

      replics.push(selectedCandidate);
    }

    const replicsOutputs = replics.map(r => r.output);
    const parameters = replics[0].parameters;
    const averageValue = Calculator.average(replicsOutputs);

    const selectedCandidate = {
      output: averageValue,
      parameters,
    } as CandidateSolution;

    if (isLower(selectedCandidate, bestCandidate)) {
      bestCandidate = selectedCandidate;
    }
  }

  return { candidate: bestCandidate } as AlgorithmResponse;
}
