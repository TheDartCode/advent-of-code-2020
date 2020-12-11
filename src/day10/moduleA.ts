type JoltageDifferenceMap = {
  "1": number;
  "3": number;
};

export const calculateJoltageDifferences = (
  list: string
): JoltageDifferenceMap => {
  const entries = list
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l) => parseInt(l))
    .sort((a, b) => a - b);


  entries.unshift(0);
  entries.push(entries[entries.length - 1] + 3);

  const differences = {
    "1": 0,
    "3": 0,
  };

  for (let i = 0; i < entries.length - 1; i++) {
    differences[entries[i + 1] - entries[i]]++;
  }

  return differences;
};

const moduleA = (list: string): number => {
  const differences = calculateJoltageDifferences(list);
  return differences["1"] * differences["3"];
};

export default moduleA;
