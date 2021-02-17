export type cellValue = 0 | 1;
export type gameBoard = cellValue[][];
export type stateHistory = { [key: string]: number };
export type stateDesc = {
  name: "pregame" | "cycle" | "dead" | "stabilized" | "ongoing";
  startTick?: number;
  length?: number;
};

export function nextBoard(board: gameBoard): gameBoard {
  return board.map((row, i) =>
    row.map((cell, j) => new Cell(board, i, j).nextValue)
  );
}

export function updateBoard(
  board: gameBoard,
  cellRow: number,
  cellCol: number,
  newValue: cellValue
): gameBoard {
  //thanks to https://stackoverflow.com/a/122704 for JSON deep-copy idea
  const boardCopy: gameBoard = JSON.parse(JSON.stringify(board));
  boardCopy[cellRow][cellCol] = newValue;
  return boardCopy;
}

export function createEmptyBoard(width: number, height: number): gameBoard {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
}

export function createRandomBoard(width: number, height: number): gameBoard {
  const randValue = () => {
    const threshold = Math.random();
    return Math.random() < threshold ? 0 : 1;
  };
  return Array(height)
    .fill(0)
    .map(() =>
      Array(width)
        .fill(0)
        .map(() => randValue())
    );
}

export function boardToString(board: gameBoard): string {
  return board.map((row) => row.join("")).join(".");
}

export function deriveGameStateDesc(
  gameStateHistory: stateHistory,
  currentState: string,
  currentTick: number
): stateDesc {
  if (Object.keys(gameStateHistory).length === 0) {
    return { name: "pregame" };
  } else if (currentState.includes("1")) {
    if (gameStateHistory.hasOwnProperty(currentState)) {
      if (gameStateHistory[currentState] === currentTick - 1) {
        return { name: "stabilized", startTick: currentTick - 1 };
      } else {
        return {
          name: "cycle",
          startTick: gameStateHistory[currentState],
          length: currentTick - gameStateHistory[currentState],
        };
      }
    } else {
      return { name: "ongoing" };
    }
  } else {
    return { name: "dead", startTick: currentTick };
  }
}

export class Cell {
  private board: gameBoard;
  private row: number;
  private col: number;

  constructor(board: gameBoard, row: number, col: number) {
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
