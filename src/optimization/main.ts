import { ExecutionEngine, randomSearch } from './algorithm/RandomSearch';

const { candidate: docker } = randomSearch(ExecutionEngine.docker, 1);
const { candidate: rscript } = randomSearch(ExecutionEngine.rscript, 1);

console.log(`Best docker candidate parameters: [${docker.parameters}]`);
console.log(`Best docker candidate output: ${docker.output}`);
console.log(`Best rscript candidate parameters: [${rscript.parameters}]`);
console.log(`Best rscript candidate output: ${rscript.output}`);
