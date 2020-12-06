const getConsensualAnswers = (entry: string) => {
  const answers = entry.replace(/\s/g, "").split("");
  const people = entry.split("\n").filter((l) => l.length > 0);
  return new Array(...new Set(answers)).filter((answer) =>
    people.every((p) => p.includes(answer))
  ).length;
};

const moduleB = (data: string): number => {
  const entries = data.split("\n\n");
  return entries.reduce(
    (total, entry) => getConsensualAnswers(entry) + total,
    0
  );
};

export default moduleB;
