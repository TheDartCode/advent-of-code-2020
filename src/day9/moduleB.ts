const TARGET_SUM = 14144619;

const createRange = (min, max) =>
  new Array(max - min).fill(null).map((_, index) => index + min);

const sumArr = (arr: number[]) => arr.reduce((total, val) => total + val, 0);

const moduleB = (list, { targetSum = TARGET_SUM } = {}) => {
  const numbers = list
    .split("\n")
    .filter((l) => l.length)
    .map((l) => parseInt(l));

  const totalNumbers = numbers.length;
  let found = false;
  for (
    let candidateIndex = 0;
    candidateIndex < numbers.length;
    candidateIndex++
  ) {
    const subsets = createRange(1, totalNumbers - candidateIndex);
    for (let subsetLength of subsets) {
      const arr = numbers.slice(candidateIndex, candidateIndex + subsetLength);
      const sum = sumArr(arr);
      if (sum === targetSum) {
        found = true;
        return Math.min(...arr) + Math.max(...arr);
      }
    }
  }
  throw new Error("Could not find contiguous area");
};
export default moduleB;
