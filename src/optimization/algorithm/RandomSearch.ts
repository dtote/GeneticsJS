import yargs from 'yargs';
import { DockerCommand } from '../commands/DockerCommand';
import { RscriptCommand } from '../commands/RscriptCommand';
import { Generator } from '../generators/Generator';
import { CandidateSolution } from '../interfaces/CandidateSolution';
import { ExecutionEngine } from '../types/enums/ExecutionEngine';
import { AlgorithmResponse } from '../types/interfaces/AlgorithmResponse';
import { RandomSearchParams } from '../types/interfaces/RandomSearchParams';
import { isLower } from '../utils/isLower';

export function randomSearch(params: RandomSearchParams): AlgorithmResponse {
  const { engine, numberOfIterations } = params;

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

    const selectedCandidate =
      engine === ExecutionEngine.DOCKER
        ? DockerCommand.run(instances[randomNumber])
        : RscriptCommand.run(instances[randomNumber]);

    if (isLower(selectedCandidate, bestCandidate)) {
      bestCandidate = selectedCandidate;
    }
  }

  return { candidate: bestCandidate } as AlgorithmResponse;
}

console.time('execution');

const argv = yargs(process.argv.slice(2))
  .options({
    i: { type: 'number', default: 5 },
  })
  .alias('i', 'iterations')
  .nargs('i', 1)
  .example('$0 -i 100', 'Runs the random search with specified iterations')
  .help('h')
  .alias('h', 'help')
  .parseSync();

const { iterations } = argv;

const { candidate } = randomSearch({ engine: ExecutionEngine.RSCRIPT, numberOfIterations: iterations });

console.log('Best fitness achieved ', candidate.output);

console.timeEnd('execution');
