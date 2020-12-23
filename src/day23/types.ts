import { clip } from "./helpers";

type CupLabel = number;
export type Cup = {
  label: CupLabel;
  next: Cup;
};

export type Cups = Cup[];

export class Game {
  public cups: Cups;
  public cupIndex: Record<CupLabel, number> = {};
  public minCup: number;
  public maxCup: number;
  constructor(cups: number[], extendedMode: boolean = false) {
    this.cups = cups.map((cup) => ({
      label: cup,
      next: null,
    }));

    this.minCup = Math.min(...cups);
    this.maxCup = Math.max(...cups);

    if (extendedMode) {
      const TOTAL_ITEMS = 1e6;
      for (let i = this.maxCup + 1; i <= TOTAL_ITEMS; i++) {
        this.cups[i - 1] = {
          label: i,
          next: null,
        };
      }
      this.maxCup = TOTAL_ITEMS;
    }

    for (let i = 0; i < this.maxCup; i++) {
      this.cups[i].next = this.cups[i + 1] || this.cups[0];
      this.cupIndex[this.cups[i].label] = i;
    }
  }

  public simulate(totalRounds: number) {
    let currentCup = this.cups[0];

    for (let round = 0; round < totalRounds; round++) {
      currentCup = this.doRound(currentCup);
    }
  }

  public findDestinationCup(game: Game, currentCup: Cup, pickedUp: Cups): Cup {
    let destinationLabel = currentCup.label - 1;
    let destinationCup = null;
    while (!destinationCup) {
      let destinationCupLabel = clip(
        destinationLabel,
        game.minCup,
        game.maxCup
      );
      destinationCup = game.cups[game.cupIndex[destinationCupLabel]];
      if (pickedUp.includes(destinationCup)) {
        destinationCup = null;
      }
      destinationLabel = destinationCupLabel - 1;
    }
    return destinationCup;
  }

  private doRound(currentCup: Cup) {
    const pickedUp = [
      currentCup.next,
      currentCup.next.next,
      currentCup.next.next.next,
    ];
    currentCup.next = pickedUp[2].next;

    const destinationCup = this.findDestinationCup(this, currentCup, pickedUp);

    const prevNext = destinationCup.next;
    destinationCup.next = pickedUp[0];
    pickedUp[2].next = prevNext;

    return currentCup.next;
  }

  public toJson() {
    return this.cups.map((c) => ({
      label: c.label,
      next: c.next.label,
    }));
  }
}
