type DayFunc = (part: "a" | "b") => string;

enum DayPart {
  "a" = 'a',
  "b" = 'b',
}

export { DayFunc, DayPart};
