export const parseLine = (line: string): PasswordEntry => {
  const [, min, max, char, password] = line.match(
    /^([\d]+)\-([\d]+) ([a-z])\: ([a-z]+)$/
  );
  return {
    policy: {
      char,
      start: parseInt(min),
      end: parseInt(max),
    },
    password: password,
  };
};