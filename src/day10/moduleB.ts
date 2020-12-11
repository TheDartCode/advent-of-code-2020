const moduleB = (list: string): number => {
  const entries = list
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l) => parseInt(l))
    .sort((a, b) => a - b);
  entries.push(entries[entries.length - 1] + 3);
  entries.unshift(0);

  const variantsPerStep = [1];

  entries.forEach((entry, index) => {
    let nextIndex = index + 1;
    while (entries[nextIndex] <= entry + 3) {
      if (!variantsPerStep[nextIndex]) {
        variantsPerStep[nextIndex] = 0;
      }
      variantsPerStep[nextIndex] += variantsPerStep[index];
      nextIndex++;
    }
  })

  return variantsPerStep[variantsPerStep.length - 1];
};

export default moduleB;
