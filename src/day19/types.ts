const MAX_RECURSION_DEPTH = 7;

export type RuleComposition = Rule[];

export type RuleContents = string | RuleComposition[];

export class Rule {
  public contents: RuleContents;

  constructor(public id: number) {}

  public getRegexString(depth: number = 0): string {
    if (depth > MAX_RECURSION_DEPTH) {
      return "";
    }
    if (typeof this.contents === "string") {
      return this.contents;
    }

    if (this.contents.length === 1) {
      return Rule.createRegexGroup(
        this.contents[0]
          .map((cc) => cc.getRegexString(cc.id === this.id ? depth + 1 : depth))
          .join("")
      );
    }

    return Rule.createRegexGroup(
      this.contents
        .map((c) =>
          c
            .map((cc) =>
              cc.getRegexString(cc.id === this.id ? depth + 1 : depth)
            )
            .join("")
        )
        .join("|")
    );
  }

  public toJson() {
    return {
      id: this.id,
      contents:
        typeof this.contents === "string"
          ? this.contents
          : this.contents.map((c: RuleComposition) => c.map((cc) => cc.id)),
    };
  }

  private static createRegexGroup(contents: string): string {
    return `(?:${contents})`;
  }
}
