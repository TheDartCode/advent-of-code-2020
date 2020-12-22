import { parseInput } from "./helpers";
import { Deck, Game } from "./types";

export enum Player {
  One = 0,
  Two = 1,
}

export const fastExit = (currentDeck: Deck, deckHistory: Deck[]): boolean => {
  return deckHistory.some((round) => {
    return (
      round.length === currentDeck.length &&
      round.every((c1) => currentDeck.includes(c1))
    );
  });
};

export const game = (p1deck: Deck, p2deck: Deck): Player => {
  let gameWinner: Player;
  const gameRoundHistory: {
    [Player.One]: Deck[];
    [Player.Two]: Deck[];
  } = {
    [Player.One]: [],
    [Player.Two]: [],
  };
  const decks = [p1deck, p2deck];

  while (gameWinner === undefined) {
    if (
      fastExit(p1deck, gameRoundHistory[Player.One]) ||
      fastExit(p2deck, gameRoundHistory[Player.Two])
    ) {
      gameWinner = Player.One;
      break;
    }

    gameRoundHistory[Player.One].push([...p1deck]);
    gameRoundHistory[Player.Two].push([...p2deck]);

    const p1card = p1deck.shift();
    const p2card = p2deck.shift();

    let roundWinner: Player;

    if (p1card <= p1deck.length && p2card <= p2deck.length) {
      roundWinner = game(p1deck.slice(0, p1card), p2deck.slice(0, p2card));
    } else if (p1card > p2card) {
      roundWinner = Player.One;
    } else if (p1card < p2card) {
      roundWinner = Player.Two;
    } else {
      throw new Error(
        `Equal cards found, ${p1card} | ${p2card} | ${p1deck.join()} | ${p2deck.join()}`
      );
    }

    decks[roundWinner].push(
      ...[p1card, p2card].sort((_, __) => (roundWinner === Player.One ? -1 : 1))
    );

    if (p1deck.length === 0) {
      gameWinner = Player.Two;
    } else if (p2deck.length === 0) {
      gameWinner = Player.One;
    }
  }
  return gameWinner;
};

const moduleB = (input: string): number => {
  const { player1, player2 } = parseInput(input);

  const p1deck = player1.deck;
  const p2deck = player2.deck;

  const winner = game(p1deck, p2deck);

  const winningDeck = winner === Player.One ? p1deck : p2deck;
  const deckSize = winningDeck.length;

  return winningDeck.reduce(
    (total, card, index) => total + card * (deckSize - index),
    0
  );
};

export default moduleB;
