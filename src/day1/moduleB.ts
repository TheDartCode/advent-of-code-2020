const moduleB = (list: string): number => {
  const items = list
    .split("\n")
    .map((s) => s.trim())
    .map((s) => parseInt(s));
  let i = 0;
  let j = 0;
  let k = 0;
  for (i of items) {
    for (j of items) {
      for (k of items) {
        if (i + j + k === 2020) {
          return i * j * k;
        }
      }
    }
  }
  return null;
};

export default moduleB;
