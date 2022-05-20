import { spawnSync } from 'child_process';
import { isNaN, isNumber } from 'lodash';
import { RSCRIPT_COMMAND } from '../constants/Commands';
import { Generator } from '../generators/Generator';
import { CandidateSolution } from '../types/interfaces/CandidateSolution';

// Rscript command example: "Rscript /home/tote/tfg/optimization-of-simulation-model-for-resource-planning-in-hospitals-under-covid-pandemic/scripts/BabsimHospital.R 9 12 5 8 3 5 3 6 34 17 4 3 1.0378014745722273 0.14697676641854834 0.09857584591242897 0.015152198475942381 0.12516932683326826 0.001926416505314644 0.10111719895736802 0.3001806967553087 0.11222952263581498 0.8315922547208356 0.00017694618815243727 2 0.26360070211595554 0.0619840922131247 1 4 0.6179578689218207"

export class RscriptCommand {
  static run(command: string): CandidateSolution {
    try {
      const buffer = spawnSync(command, { shell: true });
      const stdout = buffer.stdout
        .toString()
        .replace(/\[1]/g, '')
        .replace(/^\s+|\s+$|\s+(?=\s)/g, '');

      const output = Number(stdout);

      if (isNaN(output)) {
        throw new Error('Error during execution');
      }

      const candidate = {
        output,
        parameters: RscriptCommand.toParameters(command),
      } as CandidateSolution;

      return candidate;
    } catch (error) {
      throw new Error('Error during execution.');
    }
  }

  static build(parameters: number[], seed?: number): string {
    const joinedParameters = parameters.join(' ');
    const instance = `${RSCRIPT_COMMAND} ${joinedParameters}${isNumber(seed) ? ' --genetic-seed ' + seed : ''}`;

    return instance;
  }

  static generate(numberOfInstances: number): string[] {
    const instances = [];

    for (let index = 0; index < numberOfInstances; index++) {
      const parameters = Generator.randomSimulatorParams();
      const instance = RscriptCommand.build(parameters);

      instances.push(instance);
    }

    return instances;
  }

  static toParameters(command: string) {
    const endOfLetters = command.indexOf('.R') + 3;
    const commandWithoutLetters = command.slice(endOfLetters);
    const parameters = commandWithoutLetters.split(' ').map(str => Number(str));

    return parameters;
  }
}
