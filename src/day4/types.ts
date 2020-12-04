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

  isValid() {
    return ExpectedFieldKeys.every(
      (key) => OptionalKeys.includes(key) || !!this.fields[key]
    );
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
