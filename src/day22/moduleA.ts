import { parseInput } from "./helpers";
import { Deck, Game } from "./types";

const moduleA = (input: string): number => {
  const game: Game = parseInput(input);

  const p1deck = game.player1.deck;
  const p2deck = game.player2.deck;

  while (p1deck.length > 0 && p2deck.length > 0) {
    const p1card = p1deck.shift();
    const p2card = p2deck.shift();

    if (p1card > p2card) {
      p1deck.push(p1card);
      p1deck.push(p2card);
    } else if (p1card < p2card) {
      p2deck.push(p2card);
      p2deck.push(p1card);
    } else {
      throw new Error(
        `Equal cards found, ${p1card} | ${p2card} | ${p1deck.join()} | ${p2deck.join()}`
      );
    }
  }

  const winningDeck = p1deck.length > 0 ? p1deck : p2deck;
  const deckSize = winningDeck.length;

  return winningDeck.reduce(
    (total, card, index) => total + card * (deckSize - index),
    0
  );
};

export default moduleA;
