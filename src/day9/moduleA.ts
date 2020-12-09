const PREAMBLE = 25;
const moduleA = (list: string, { preamble = PREAMBLE } = {}) => {
  const numbers = list
    .split("\n")
    .filter((l) => l.length)
    .map((l) => parseInt(l));
  for (let i = preamble; i < numbers.length; i++) {
    const num = numbers[i];
    let found = false;
    const candidates = numbers.slice(i - preamble, i);
    for (let candidate of candidates) {
      if (candidates.includes(num - candidate)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return num;
    }
  }
  throw new Error("No invalid number found");
};

export default moduleA;
