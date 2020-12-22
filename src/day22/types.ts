export type Card = number;

export type Deck = Card[];

export type Player = {
  deck: Deck;
};

export type Game = {
  player1: Player;
  player2: Player;
};
