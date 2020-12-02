type PasswordPolicy = {
  char: string;
  start: number;
  end: number;
};

type PasswordEntry = {
  policy: PasswordPolicy;
  password: string;
};