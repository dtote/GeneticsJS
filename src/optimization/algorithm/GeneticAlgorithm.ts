import path from 'path';
import { nativeMath } from 'random-js';
import { EvolutionaryAlgorithm, EvolutionaryAlgorithmParams } from '../../algorithms';
import { CrossoverParams, OnePointCrossover, OnePointCrossoverParams } from '../../crossover';
import { FitnessFunction } from '../../fitness';
import { MixedGenerator, NumericParams } from '../../generator';
import { NumericRange } from '../../individual';
import { MixedIndividual } from '../../individual/numeric/mixed';
import { MutationParams } from '../../mutation';
import { MixedPolynomialMutation } from '../../mutation/numeric/mixed';
import { Population } from '../../population';
import {
  FitnessBased,
  FitnessProportionalSelection,
  FitnessProportionalSelectionParams,
  RouletteWheel,
} from '../../selection';
import { MaxGenerations } from '../../termination';
import { Calculator } from '../calculator/Calculator';
import { RscriptCommand } from '../commands/RscriptCommand';
import { NUMBER_OF_PARAMS } from '../constants/NumberOfParams';
import { ExecutionData } from '../data/Data';
import { ExecutionInfo } from '../types/interfaces/ExecutionInfo';

console.time('execution');

const saveFilePath = path.join(__dirname, '..', '..', '..', 'src', 'optimization', 'data', 'data');

const experiments = new ExecutionData({
  execution: Number(path.basename(saveFilePath).slice(4)),
  generations: [],
} as ExecutionInfo);

let logger = false;
const maxGenerations = 1;
const populationSize = 2;
const replics = 1;

const fitnessFunction: FitnessFunction<MixedIndividual, number> = individual => {
  const { genotype: params } = individual;

  const fitnesses = [];
  for (let index = 0; index < replics; index++) {
    const instance = RscriptCommand.build(params, index);
    const { output: fitness } = RscriptCommand.run(instance);

    fitnesses.push(fitness);
  }

  const averageFitness = Calculator.average(fitnesses);

  if (logger) {
    experiments.store({ fitness: averageFitness, individual, populationSize });
  }

  return averageFitness;
};

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

logger = true;

const params: EvolutionaryAlgorithmParams<
  MixedIndividual,
  number,
  NumericParams,
  FitnessProportionalSelectionParams<MixedIndividual, number>,
  OnePointCrossoverParams<MixedIndividual, number>,
  MutationParams
> = {
  populationSize,
  generator: new MixedGenerator(),
  generatorParams: {
    engine: nativeMath,
    length: NUMBER_OF_PARAMS,
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
  mutation: new MixedPolynomialMutation(), // TODO: should check if uniform and non uniform mutation are ok
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
  MutationParams
>(params, createPopulation());

evolutionaryAlgorithm.run();

const bestCandidate = evolutionaryAlgorithm.population.getFittestIndividualItem()?.individual;
const fitness = evolutionaryAlgorithm.population.getFittestIndividualItem()?.fitness;

if (bestCandidate === undefined) {
  throw 'Not fittest individual found';
}

experiments.write(saveFilePath);

console.log('Best fitness achieved ', fitness);
console.timeEnd('execution');
