export type Bit = "0" | "1";

export type Bits = Bit[];

export type BitMask = (Bit | "X")[];

export enum Opcode {
  SetMem,
  Mask,
}

export type Operation =
  | {
      opcode: Opcode.SetMem;
      address: number;
      value: number;
    }
  | {
      opcode: Opcode.Mask;
      bitMask: BitMask;
    };

export type Instruction = {};
