import { readFileSync, writeFile } from 'fs';
import path from 'path';
import { IndividualData } from '../types/interfaces/ExecutionInfo';
import { stringify } from '../utils/stringify';

const NUMBER_OF_EXECUTIONS = 30;
export const storeBestIndividualFromLastGenOfAllExecutions = (configuration: number) => {
  const bestIndividuals = [];
  for (let index = 1; index <= NUMBER_OF_EXECUTIONS; index++) {
    const fileData = readFileSync(path.join(__dirname, `conf${configuration}_run_${index}.json`), {
      encoding: 'utf-8',
    });
    const parsedData = JSON.parse(fileData);

    const lastGen: IndividualData[] = parsedData.generations[parsedData.generations.length - 1];
    const bestIndividual = lastGen.reduce((best, current) => {
      if (current.fitness < best.fitness) best = current;

      return best;
    });
    bestIndividuals.push({ run: index, individual: bestIndividual });
  }
  writeFile(
    path.join(__dirname, 'best', `conf${configuration}.json`),
    stringify(bestIndividuals),
    { encoding: 'utf-8', flag: 'a' },
    err => {
      if (err) {
        return console.log(err);
      }
    },
  );
};

storeBestIndividualFromLastGenOfAllExecutions(1);
storeBestIndividualFromLastGenOfAllExecutions(2);
storeBestIndividualFromLastGenOfAllExecutions(3);
storeBestIndividualFromLastGenOfAllExecutions(4);
