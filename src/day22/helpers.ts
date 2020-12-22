import { Game } from "./types";

export const parseInput = (input: string): Game => {
  const REGEX = /Player \d:\n([\d\n]+)/gm;
  const [p1, p2] = input.split("\n\n");
  const [, p1Cards] = new RegExp(REGEX).exec(p1);
  const [, p2Cards] = new RegExp(REGEX).exec(p2);
  return {
    player1: { deck: p1Cards.split("\n").map((r) => parseInt(r)) },
    player2: { deck: p2Cards.split("\n").map((r) => parseInt(r)) },
  };
};
