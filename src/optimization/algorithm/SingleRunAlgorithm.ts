import { RscriptCommand, SeedType } from '../commands/RscriptCommand';

/**
 * Execution analysis
 */

const command = RscriptCommand.build(
  [
    /*1 - lower better */ 6,
    /*2 - lower better */ 7,
    /*3 - irrelevant */ 3,
    /*4 - irrelevant (avoid 8) */ 4,
    /*5 - irrelevant */ 7,
    /*6 - irrelevant */ 9,
    /*7 - irrelevant */ 3,
    /*8 - irrelevant */ 9,
    /*9 - irrelevant */ 26,
    /*10 - irrelevant */ 21,
    /*11 - irrelevant */ 4,
    /*12 - irrelevant */ 3,
    /*13 - relevant (lower better) (should be relevant) */ 0.25,
    /*14 - seems irrelevant (should be relevant) */ 0.05,
    /*15 - seems irrelevant (but the lower better) */ 0.7,
    /*16 - irrelevant */ 0.005,
    /*17 - relevant (lower better) (should be relevant) */ 0.07,
    /*18 - irrelevant */ 0.002,
    /*19 - irrelevant */ 0.008,
    /*20 - irrelevant (avoid 0.3) */ 0.35,
    /*21 - irrelevant */ 0.08,
    /*22 - irrelevant */ 0.9,
    /*23 - irrelevant */ 0.01,
    /*24 - irrelevant */ 3,
    /*25 - seems irrelevant (should be relevant) */ 1.1,
    /*26 - seems irrelevant (should be relevant) */ 0.0625,
    /*27 - irrelevant */ 1,
    /*28 - irrelevant */ 2,
    /*29 - irrelevant */ 0.75,
  ],
  { type: SeedType.GENETIC, value: 1 },
);
const solution = RscriptCommand.run(command);
console.log(solution.output);
