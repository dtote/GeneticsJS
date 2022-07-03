import { writeFile } from 'fs';
import path from 'path';
import yargs from 'yargs';
import { DockerCommand } from '../commands/DockerCommand';
import { RscriptCommand } from '../commands/RscriptCommand';
import { Generator } from '../generators/Generator';
import { CandidateSolution } from '../interfaces/CandidateSolution';
import { ExecutionEngine } from '../types/enums/ExecutionEngine';
import { AlgorithmResponse } from '../types/interfaces/AlgorithmResponse';
import { RandomSearchParams } from '../types/interfaces/RandomSearchParams';
import { isLower } from '../utils/isLower';
import { stringify } from '../utils/stringify';

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
    t: { type: 'number', default: 1 },
  })
  .alias('i', 'iterations')
  .nargs('i', 1)
  .example('$0 -i 100', 'Runs the random search with specified iterations')

  .alias('t', 'times')
  .nargs('t', 1)
  .example('$0 -t 2', 'Runs the random search t times')

  .help('h')
  .alias('h', 'help')
  .parseSync();

const { iterations, times } = argv;

const results = [];
for (let index = 0; index < times; index++) {
  const { candidate } = randomSearch({ engine: ExecutionEngine.RSCRIPT, numberOfIterations: iterations });
  results.push(candidate);
}

const outputfile = path.join(__dirname, '..', 'data', 'best', `random_search_30_${iterations}.json`);
writeFile(outputfile, stringify(results), { encoding: 'utf-8', flag: 'a' }, err => {
  if (err) {
    return console.log(err);
  }
});

const bestFitness = Math.min(...results.map(s => s.output));
console.log('Best fitness achieved ', bestFitness);
console.log('Results saved on file ', outputfile);
console.timeEnd('execution');
