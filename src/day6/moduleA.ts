const getUniqueAnswers = (entry: string) => {
  const answers = entry.replace(/\s/g, '').split('');
  return new Set(answers).size;
};

const moduleA = (data: string): number => {
  const entries = data.split('\n\n');
  return entries.reduce((total, entry) => getUniqueAnswers(entry) + total, 0);
};

export default moduleA;
