// An instance form is: "Rscript /home/tote/tfg/optimization-of-simulation-model-for-resource-planning-in-hospitals-under-covid-pandemic/scripts/BabsimHospital.R 9 12 5 8 3 5 3 6 34 17 4 3 1.0378014745722273 0.14697676641854834 0.09857584591242897 0.015152198475942381 0.12516932683326826 0.001926416505314644 0.10111719895736802 0.3001806967553087 0.11222952263581498 0.8315922547208356 0.00017694618815243727 2 0.26360070211595554 0.0619840922131247 1 4 0.6179578689218207"
export function extractParametersFromRscriptInstance(instance: string) {
  const endOfLetters = instance.indexOf(".R") + 3;
  const instanceWithoutLetters = instance.slice(endOfLetters);
  const parameters = instanceWithoutLetters
    .split(" ")
    .map((str) => Number(str));

  return parameters;
}
