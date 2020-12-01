const moduleA = (list: string): number => {
  const items = list
    .split("\n")
    .map((s) => s.trim())
    .map((s) => parseInt(s));
  let i = 0;
  let j = 0;
  for (i of items) {
    for (j of items) {
      if (i + j === 2020) {
        return i * j;
      }
    }
  }
  return null;
};

export default moduleA;
