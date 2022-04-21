// An instance form is: "docker run --rm mrebolle/r-geccoc:Track1 -c 'Rscript objfun.R '13,11,5,9,5,8,3,7,29,20,4,5,0.9379808054800287,0.08441531200677291,0.08528385813225592,0.012347186091480816,0.08135414963870324,0.0009032053168092967,0.09879778452268863,0.2988875557348542,0.09238234658431071,0.6483335697959305,0.0007918733764480738,3,0.32341500161548464,0.004169911269926939,2,5,0.6175714436270859' '"
export function extractParametersFromDockerInstance(instance: string) {
  const endOfLetters = instance.indexOf(".R") + 2;
  const instanceWithoutLetters = instance.slice(endOfLetters);
  const instanceValuesAsStrings = instanceWithoutLetters
    .replace(/[' ]/g, "")
    .split(",");

  return instanceValuesAsStrings.map((value) => Number(value));
}
