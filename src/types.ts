type DayFunc = (part: "a" | "b", data: string, extraOptions?: Object) => string;

enum DayPart {
  "a" = 'a',
  "b" = 'b',
}

export { DayFunc, DayPart};
