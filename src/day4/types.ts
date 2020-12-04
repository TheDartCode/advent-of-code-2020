enum ExpectedFields {
  BirthYear = "byr",
  IssueYear = "iyr",
  ExpirationYear = "eyr",
  Height = "hgt",
  HairColor = "hcl",
  EyeColor = "ecl",
  PassportID = "pid",
  CountryID = "cid",
}

const ExpectedFieldKeys = Object.values(ExpectedFields);

export const OptionalKeys = [ExpectedFields.CountryID];

type FieldSet = {
  [key in ExpectedFields]?: string;
};

type ExtendedValidatorFunction = (value: string) => boolean;
type FieldValidatorFunction = (value: string, strict: boolean) => boolean;
type FieldValidatorMapping = {
  [key in ExpectedFields]: FieldValidatorFunction;
};

const createValidatorFunction = (
  extraValidator: ExtendedValidatorFunction
): FieldValidatorFunction => (value: string, strict: boolean) => {
  if (!strict) {
    return !!value;
  }
  if (!value) {
    return false;
  }

  return extraValidator(value);
};

const FieldValidators: FieldValidatorMapping = {
  [ExpectedFields.BirthYear]: createValidatorFunction((value) => {
    const yearAsNumber = parseInt(value);
    return yearAsNumber >= 1920 && yearAsNumber <= 2002;
  }),
  [ExpectedFields.IssueYear]: createValidatorFunction((value) => {
    const yearAsNumber = parseInt(value);
    return yearAsNumber >= 2010 && yearAsNumber <= 2020;
  }),
  [ExpectedFields.ExpirationYear]: createValidatorFunction((value) => {
    const yearAsNumber = parseInt(value);
    return yearAsNumber >= 2020 && yearAsNumber <= 2030;
  }),
  [ExpectedFields.Height]: createValidatorFunction((value) => {
    const matcher = /(\d+)(cm|in)/;
    const [, heightString, unit] = value.match(matcher) || [];
    const height = parseInt(heightString);
    switch (unit) {
      case "cm":
        return height >= 150 && height <= 193;
      case "in":
        return height >= 59 && height <= 76;
      default:
        return false;
    }
  }),
  [ExpectedFields.HairColor]: createValidatorFunction((value) => {
    const matcher = /^#[0-9a-f]{6,6}$/;
    return !!value.match(matcher);
  }),
  [ExpectedFields.EyeColor]: createValidatorFunction((value) => {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
  }),
  [ExpectedFields.PassportID]: createValidatorFunction((value) => {
    return value.length === 9 && !isNaN(parseInt(value));
  }),
  [ExpectedFields.CountryID]: (value, strict) => true,
};

class Passport {
  fields: FieldSet = {};

  constructor(serializedFields: string) {
    const fieldStrings = serializedFields.split(/[\ \n]/g);

    fieldStrings.forEach((fieldString) => {
      const [key, value] = fieldString.split(":").map((s) => s.trim());

      if (!ExpectedFieldKeys.includes(key as ExpectedFields)) {
        throw new Error(`Invalid Passport Field key \`${key}\``);
      }

      this.fields[key] = value;
    });
  }

  isValid({ strict = false } = {}) {
    try {
      return ExpectedFieldKeys.every(
        (key) =>
          OptionalKeys.includes(key) ||
          FieldValidators[key](this.fields[key], strict)
      );
    } catch (err) {
      console.log(err.message, this.dbg());
      return false;
    }
  }

  dbg() {
    return (
      Object.entries(this.fields)
        .map(([key, value]) => `${key}: '${value}'`)
        .join("\n") +
      "\nisValid: " +
      this.isValid()
    );
  }
}

export { ExpectedFields, ExpectedFieldKeys, Passport };
