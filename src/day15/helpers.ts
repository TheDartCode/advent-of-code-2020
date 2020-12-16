export const numbersGame = (
  startingNumbers: number[],
  rounds: number
): number => {
  const lastAppearances = new Array();

  let previousNum: number;

  for (let i = 0; i < startingNumbers.length - 1; i++) {
    lastAppearances[startingNumbers[i]] = i + 1;
  }
  previousNum = startingNumbers[startingNumbers.length - 1];

  for (let turn = startingNumbers.length + 1; turn <= rounds; turn++) {
    const previousTurn = turn - 1;
    const nextNum =
      lastAppearances[previousNum] >= 0
        ? previousTurn - lastAppearances[previousNum]
        : 0;

    lastAppearances[previousNum] = previousTurn;
    previousNum = nextNum;
  }
  return previousNum;
};
