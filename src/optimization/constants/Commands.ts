import path from 'path';

export const RSCRIPT_COMMAND = `Rscript ${path.join(
  __dirname,
  '..',
  '..',
  'optimization',
  'scripts',
  'BabsimHospital.R',
)}`.replace('lib', 'src');

export const DOCKER_COMMAND = "docker run --rm mrebolle/r-geccoc:Track1 -c 'Rscript objfun.R";
