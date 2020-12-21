import { flipMatrixHr, flipMatrixVt, rotateMatrix } from "./helpers";

export type Pixel = "." | "#";

export enum EdgeDirection {
  Up = "UP",
  Right = "RIGHT",
  Down = "DOWN",
  Left = "LEFT",
}

export type TileContents = Pixel[][];

export type TileVersionName =
  | "matrix"
  | "r90"
  | "r180"
  | "r270"
  | "flipMatrixHr(matrix)"
  | "flipMatrixHr(r90)"
  | "flipMatrixVt(matrix)"
  | "flipMatrixVt(r90)";

export type TileVersion = {
  name: TileVersionName;
  contents: TileContents;
  edges: Record<EdgeDirection, string>;
};

export type TileConnection = {
  tileID: TileID;
  tileVersionIndex: number;
  edgeDirection: EdgeDirection;
  otherTileID: TileID;
  otherTileVersionIndex: number;
  otherEdgeDirection: EdgeDirection;
};

export type TileConnections = Record<
  TileID,
  {
    [versionIndex: string]: TileConnection[];
  }
>;

export type TileID = string;

export class Tile {
  public ID: TileID;
  public versions: TileVersion[] = [];
  private size: number;
  private static REGEX = /^Tile (\d+):\n([\.#\n]+)$/gm;

  constructor(tileString: string) {
    const regExp = new RegExp(Tile.REGEX);
    const [, tileID, contentsString] = regExp.exec(tileString);
    this.ID = tileID;
    const contents = contentsString
      .split("\n")
      .map((l) => l.split("")) as Pixel[][];
    this.size = contents.length;
    this.calculateVersions(contents);
  }

  private calculateVersions(matrix: TileContents): void {
    const r90 = rotateMatrix(matrix);
    const r180 = rotateMatrix(r90);
    const r270 = rotateMatrix(r180);
    this.versions.push(this.createTileVersion("matrix", matrix));
    this.versions.push(this.createTileVersion("r90", r90));
    this.versions.push(this.createTileVersion("r180", r180));
    this.versions.push(this.createTileVersion("r270", r270));
    this.versions.push(
      this.createTileVersion("flipMatrixHr(matrix)", flipMatrixHr(matrix))
    );
    this.versions.push(
      this.createTileVersion("flipMatrixHr(r90)", flipMatrixHr(r90))
    );
    this.versions.push(
      this.createTileVersion("flipMatrixVt(matrix)", flipMatrixVt(matrix))
    );
    this.versions.push(
      this.createTileVersion("flipMatrixVt(r90)", flipMatrixVt(r90))
    );
  }

  private createTileVersion(
    name: TileVersionName,
    contents: TileContents
  ): TileVersion {
    return {
      name,
      contents,
      edges: {
        [EdgeDirection.Up]: contents[0].join(""),
        [EdgeDirection.Right]: contents.map((r) => r[this.size - 1]).join(""),
        [EdgeDirection.Down]: contents[this.size - 1].join(""),
        [EdgeDirection.Left]: contents.map((r) => r[0]).join(""),
      },
    };
  }

  public toJson(): Object {
    return {
      ID: this.ID,
      contents: this.versions[0].contents,
    };
  }
}
