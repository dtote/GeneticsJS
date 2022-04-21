import { Execution } from '../execution/Execution';
import { Generator } from '../generators/Generator';
import { CandidateSolution } from '../interfaces/CandidateSolution';
import { isLower } from '../utils/isLower';

export enum ExecutionEngine {
  docker = 'docker',
  rscript = 'rscript',
}

export function randomSearch(executionEngine: ExecutionEngine, iterations = 100): { candidate: CandidateSolution } {
  const instances =
    executionEngine === ExecutionEngine.docker
      ? Generator.generateDockerInstances(iterations)
      : Generator.generateRscriptInstances(iterations);

  let bestCandidate = {
    parameters: [],
    output: Number.MAX_SAFE_INTEGER,
    seed: undefined,
    error: undefined,
  } as CandidateSolution;

  for (let index = 0; index < iterations; index++) {
    const randomNumber = Generator.generateRandomIntegerFromRange({
      lower: 0,
      upper: instances.length - 1,
    });

    const selectedCandidate =
      executionEngine === ExecutionEngine.docker
        ? Execution.execDockerInstance(instances[randomNumber])
        : Execution.execRscriptInstance(instances[randomNumber]);

    if (isLower(selectedCandidate, bestCandidate)) {
      bestCandidate = selectedCandidate;
    }
  }

  return { candidate: bestCandidate };
}
