export type cellValue = 0 | 1;

export default function nextBoard(board: cellValue[][]): cellValue[][] {
  return board.map((row, i) =>
    row.map((cell, j) => new Cell(board, i, j).nextValue)
  );
}

export class Cell {
  private board: cellValue[][];
  private row: number;
  private col: number;

  constructor(board: cellValue[][], row: number, col: number) {
    this.board = board;
    this.row = row;
    this.col = col;
  }

  get value(): cellValue {
    if (this.coordinatesAreInvalid) {
      return 0;
    } else {
      return this.board[this.row][this.col];
    }
  }

  get isAlive(): boolean {
    return this.value === 1;
  }

  get coordinatesAreInvalid(): boolean {
    return (
      typeof this.board[this.row] === "undefined" ||
      typeof this.board[this.row][this.col] === "undefined"
    );
  }

  get nextValue(): cellValue {
    return this.cellIsAliveNextTick() ? 1 : 0;
  }

  get liveNeighborCount(): number {
    return (
      new Cell(this.board, this.row - 1, this.col).value +
      new Cell(this.board, this.row + 1, this.col).value +
      new Cell(this.board, this.row, this.col - 1).value +
      new Cell(this.board, this.row, this.col + 1).value +
      new Cell(this.board, this.row + 1, this.col + 1).value +
      new Cell(this.board, this.row - 1, this.col + 1).value +
      new Cell(this.board, this.row - 1, this.col - 1).value +
      new Cell(this.board, this.row + 1, this.col - 1).value
    );
  }

  private cellIsAliveNextTick(): boolean {
    const isAliveAndShouldStayAlive =
      this.isAlive &&
      (this.liveNeighborCount === 2 || this.liveNeighborCount === 3);
    const isDeadAndShouldBeAlive =
      !this.isAlive && this.liveNeighborCount === 3;
    return isAliveAndShouldStayAlive || isDeadAndShouldBeAlive;
  }
}
