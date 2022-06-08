import { readFileSync } from 'fs';
import path from 'path';
import { nativeMath } from 'random-js';
import yargs from 'yargs';
import { EvolutionaryAlgorithm } from '../../algorithms';
import { nonUniformMutationParams } from '../../config/nonUniform';
import { polynomialMutationParams } from '../../config/polynomial';
import { uniformMutationParams } from '../../config/uniform';
import { CrossoverParams } from '../../crossover';
import { FitnessFunction } from '../../fitness';
import { MixedGenerator, NumericParams } from '../../generator';
import { NumericRange } from '../../individual';
import { MixedIndividual } from '../../individual/numeric/mixed';
import { MutationParams } from '../../mutation';
import { Population } from '../../population';
import { FitnessProportionalSelectionParams } from '../../selection';
import { MaxGenerations } from '../../termination';
import { Calculator } from '../calculator/Calculator';
import { RscriptCommand, SeedType } from '../commands/RscriptCommand';
import { NUMBER_OF_PARAMS } from '../constants/NumberOfParams';
import { ExecutionData } from '../data/Data';
import { ExecutionInfo } from '../types/interfaces/ExecutionInfo';

console.time('execution');

const argv = yargs(process.argv.slice(2))
  .options({
    f: { type: 'string', requiresArg: true, default: 'nonUniform.ts' },
    r: { type: 'number', default: 1 },
    p: { type: 'number', default: 5 },
    g: { type: 'number', default: 5 },
    o: { type: 'string', default: 'data' },
  })
  .alias('f', 'file')
  .nargs('f', 1)
  .demandOption(['f'])
  .example('$0 -f uniform.ts', 'Uses the given file configuration')

  .alias('r', 'replics')
  .nargs('r', 1)
  .example('$0 -r 2', 'Runs genetic with specified number of replics')

  .alias('p', 'populationSize')
  .alias('p', 'population')
  .nargs('p', 1)
  .example('$0 -p 2', 'Runs genetic with specified population size')

  .alias('g', 'maxGenerations')
  .alias('g', 'generations')
  .nargs('g', 1)
  .example('$0 -g 2', 'Runs genetic with specified max number of generations')

  .alias('o', 'outputFile')
  .alias('o', 'output')
  .nargs('o', 1)
  .example('$0 -o output', 'Runs genetic with specified name for output file')

  .help('h')
  .alias('h', 'help')
  .parseSync();

const { file, replics, populationSize, maxGenerations, outputFile } = argv;

try {
  const configurationFilePath = path.join(__dirname, '..', '..', 'config', file);

  readFileSync(configurationFilePath);
} catch (e) {
  throw new Error(`Error reading configuration file: ${e}`);
}

const configurations: Record<string, any> = {
  'polynomial.ts': polynomialMutationParams,
  'uniform.ts': uniformMutationParams,
  'nonUniform.ts': nonUniformMutationParams,
};

const params = configurations[file];
params.populationSize = populationSize;
params.terminationCondition = new MaxGenerations(maxGenerations);

const saveFilePath = path.join(__dirname, '..', '..', '..', 'src', 'optimization', 'data', outputFile);

const experiments = new ExecutionData({
  execution: Number(path.basename(saveFilePath).slice(4)),
  generations: [],
} as ExecutionInfo);

let logger = false;

const fitnessFunction: FitnessFunction<MixedIndividual, number> = individual => {
  const { genotype: params } = individual;

  const fitnesses = [];
  for (let index = 0; index < replics; index++) {
    const instance = RscriptCommand.build(params, { type: SeedType.GENETIC, value: index });
    const { output: fitness } = RscriptCommand.run(instance);
    fitnesses.push(fitness);
    if (!logger) break;
  }

  const averageFitness = Calculator.average(fitnesses);

  if (logger) {
    experiments.store({ fitness: averageFitness, individual, populationSize });
  }

  return averageFitness;
};

params.fitnessFunction = fitnessFunction;

const createPopulation = () => {
  const population = new Population<MixedIndividual, number>(
    (currentBestFitness, newFitness) => newFitness < currentBestFitness,
  );

  for (let index = 0; index < populationSize; index++) {
    const mixedGenerator = new MixedGenerator();
    const individual = mixedGenerator.generateWith({
      length: NUMBER_OF_PARAMS,
      engine: nativeMath,
      range: new NumericRange(),
    });

    const fitness = fitnessFunction(individual);

    population.pushIndividual(individual, fitness);
  }

  return population;
};

const evolutionaryAlgorithm = new EvolutionaryAlgorithm<
  MixedIndividual,
  number,
  NumericParams,
  FitnessProportionalSelectionParams<MixedIndividual, number>,
  CrossoverParams<MixedIndividual, number>,
  MutationParams
>(params, createPopulation());

logger = true;

evolutionaryAlgorithm.run();

const bestCandidate = evolutionaryAlgorithm.population.getFittestIndividualItem()?.individual;
const fitness = evolutionaryAlgorithm.population.getFittestIndividualItem()?.fitness;

if (bestCandidate === undefined) {
  throw 'Not fittest individual found';
}

experiments.write(saveFilePath);

console.log('Best fitness achieved ', fitness);
console.timeEnd('execution');
