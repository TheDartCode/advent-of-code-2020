type DayFunc = (part: "a" | "b", data: string) => string;

enum DayPart {
  "a" = 'a',
  "b" = 'b',
}

export { DayFunc, DayPart};
