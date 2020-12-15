const moduleA = (list: string): number => {
  const startingNumbers = list.split(",").map((c) => parseInt(c));
  const lastAppearances = new Array();
  const nM2Appearances = new Array();
  let previousNum: number;
  for (let turn = 1; turn <= 2020; turn++) {
    let currentNum: number;
    if (turn <= startingNumbers.length) {
      currentNum = startingNumbers[turn - 1];
    } else {
      currentNum = nM2Appearances[previousNum]
        ? turn - 1 - nM2Appearances[previousNum]
        : 0;
    }

    nM2Appearances[currentNum] = lastAppearances[currentNum];
    lastAppearances[currentNum] = turn;

    previousNum = currentNum;
  }
  return previousNum;
};

export default moduleA;
