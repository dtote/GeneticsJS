import { existsSync, mkdirSync, writeFile } from 'fs';
import path from 'path';
import { nativeMath } from 'random-js';
import { EvolutionaryAlgorithm, EvolutionaryAlgorithmParams } from '../../algorithms';
import { CrossoverParams, OnePointCrossover, OnePointCrossoverParams } from '../../crossover';
import { FitnessFunction } from '../../fitness';
import { MixedGenerator, NumericParams } from '../../generator';
import { NumericRange } from '../../individual';
import { MixedIndividual } from '../../individual/numeric/mixed';
import { MixedPolynomialMutation } from '../../mutation';
import { PolynomialMutationParams } from '../../mutation/base/PolynomialMutation';
import {
  FitnessBased,
  FitnessProportionalSelection,
  FitnessProportionalSelectionParams,
  RouletteWheel,
} from '../../selection';
import { MaxGenerations } from '../../termination';
import { Builder } from '../builders/Builder';
import { Execution } from '../execution/Execution';

console.time('execution');

interface ExecutionInfo {
  execution: number;
  generations: Array<Array<{ id: number; fitness: number; genotype: number[] }>>;
}

const saveFilePath = path.join(__dirname, '..', '..', '..', 'src', 'optimization', 'data', 'data');
const executionInfo: ExecutionInfo = {
  execution: Number(path.basename(saveFilePath).slice(4)),
  generations: [],
};

let iteration = 0;
// const crossover: Crossover<MixedIndividual, number, CrossoverParams<MixedIndividual, number>> = new OnePointCrossover();
const maxGenerations = 5; //50;
const populationSize = 5;
const fitnessFunction: FitnessFunction<MixedIndividual, number> = individual => {
  const { genotype: params } = individual;
  const instance = Builder.rscriptInstance(params);
  const { output: fitness } = Execution.execRscriptInstance(instance);

  // Simulation information
  const generation = Math.floor(iteration / populationSize);
  const individualNumber = Math.abs(populationSize * generation - iteration) + 1;
  console.log(`FITNESS: Gen ${generation}, Ind ${individualNumber}: ${fitness}\n`);
  iteration++;

  if (!executionInfo.generations[generation]) {
    executionInfo.generations[generation] = [];
  }

  executionInfo.generations[generation].push({
    id: generation,
    fitness,
    genotype: individual.genotype,
  });

  return fitness;
};

const params: EvolutionaryAlgorithmParams<
  MixedIndividual,
  number,
  NumericParams,
  FitnessProportionalSelectionParams<MixedIndividual, number>,
  OnePointCrossoverParams<MixedIndividual, number>,
  PolynomialMutationParams
> = {
  populationSize,
  generator: new MixedGenerator(),
  generatorParams: {
    engine: nativeMath,
    length: 29,
    range: new NumericRange(),
  },
  selection: new FitnessProportionalSelection(),
  selectionParams: {
    engine: nativeMath,
    selectionCount: populationSize,
    subSelection: new RouletteWheel(),
  },
  crossover: new OnePointCrossover<MixedIndividual, number>(),
  crossoverParams: {
    engine: nativeMath,
    individualConstructor: MixedIndividual,
  },
  mutation: new MixedPolynomialMutation(),
  mutationParams: {
    engine: nativeMath,
  },
  replacement: new FitnessBased(true),
  replacementParams: {
    selectionCount: populationSize,
  },
  fitnessFunction,
  terminationCondition: new MaxGenerations(maxGenerations),
};

const evolutionaryAlgorithm = new EvolutionaryAlgorithm<
  MixedIndividual,
  number,
  NumericParams,
  FitnessProportionalSelectionParams<MixedIndividual, number>,
  CrossoverParams<MixedIndividual, number>,
  PolynomialMutationParams
>(params);

evolutionaryAlgorithm.run();

const bestCandidate = evolutionaryAlgorithm.population.getFittestIndividualItem()?.individual;
const fitness = evolutionaryAlgorithm.population.getFittestIndividualItem()?.fitness;

if (bestCandidate === undefined) {
  throw 'Not fittest individual found';
}

const stringify = (obj: any, indent = 2) =>
  JSON.stringify(
    obj,
    (key, value) => {
      if (Array.isArray(value) && !value.some(x => x && typeof x === 'object')) {
        return `\uE000${JSON.stringify(value.map(v => (typeof v === 'string' ? v.replace(/"/g, '\uE001') : v)))}\uE000`;
      }
      return value;
    },
    indent,
  ).replace(/"\uE000([^\uE000]+)\uE000"/g, match =>
    match
      .slice(2, match.length - 4)
      .replace(/\\"/g, '"')
      .replace(/\uE001/g, '\\"'),
  );

console.log('Checking', saveFilePath);
if (!existsSync(path.dirname(saveFilePath))) {
  mkdirSync(path.dirname(saveFilePath), { recursive: true });
}
console.log('Writing...');
writeFile(saveFilePath + '.json', stringify(executionInfo), { encoding: 'utf-8', flag: 'a' }, err => {
  if (err) return console.log(err);
  console.log(path.basename(saveFilePath), 'has been saved');
});

console.log('Fittest candidate located at ', saveFilePath);
console.log('Best fitness achieved ', fitness);
console.timeEnd('execution');
