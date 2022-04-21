import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import { Builder } from '../builders/Builder';
import { CandidateSolution } from '../interfaces/CandidateSolution';
import { extractParametersFromRscriptInstance } from '../utils/ExtractParametersFromRscriptInstance';

export class Execution {
  static execDockerInstance(instance: string) {
    try {
      const buffer: Buffer = execSync(instance);
      const candidate: CandidateSolution = Builder.dockerCandidate(instance, buffer);

      return candidate;
    } catch (error) {
      throw new Error('Error during execution.');
    }
  }

  static execRscriptInstance(instance: string): CandidateSolution {
    const cosas = instance;
    try {
      execSync(instance);
      const data = readFileSync(path.join(__dirname, '..', '..', '..', 'output.txt'));

      const parsedData = data
        .toString()
        .replace(/\[1]/g, '')
        .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
        .split(' ')
        .map(s => Number(s));
      const candidate = {
        output: parsedData[0],
        seed: parsedData[1],
        error: parsedData[2],
        parameters: extractParametersFromRscriptInstance(instance),
      } as CandidateSolution;

      return candidate;
    } catch (error) {
      throw new Error(`Error during execution: ${error} ${cosas}`);
    }
  }
}
