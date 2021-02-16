import { nextBoard, gameBoard, Cell, updateBoard } from "./game-board";

describe("nextBoard", () => {
  test("the next board of an empty board is an empty board", () => {
    expect(nextBoard([])).toEqual([]);
    expect(nextBoard([[]])).toEqual([[]]);
  });

  test("the next board of an entirely dead board is an entirely dead board", () => {
    const deadBoard: gameBoard = [
      [0, 0],
      [0, 0],
    ];
    expect(nextBoard(deadBoard)).toEqual(deadBoard);
  });

  test("Any living cell with fewer than two live neighbors dies", () => {
    const board: gameBoard = [
      [0, 1],
      [1, 0],
    ];
    const expected: gameBoard = [
      [0, 0],
      [0, 0],
    ];
    expect(nextBoard(board)).toEqual(expected);
  });

  test("Any living cell with two live neighbors survives", () => {
    const board: gameBoard = [
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    expect(nextBoard(board)[0][1]).toEqual(1);
  });
});

test("Any living cell with three live neighbors survives", () => {
  const board: gameBoard = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ];
  expect(nextBoard(board)[0][1]).toBe(1);
});

test("Any living cell with more than three live neighbors dies", () => {
  const board: gameBoard = [
    [1, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ];
  expect(nextBoard(board)[1][0]).toBe(0);
});

test("Any dead cell with three live neighbors becomes alive", () => {
  const board: gameBoard = [
    [1, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ];
  expect(nextBoard(board)[2][1]).toBe(1);
});

describe("Cell.liveNeighborCount", () => {
  test("returns 0 when cell coordinates are invalid", () => {
    expect(new Cell([], 0, 0).liveNeighborCount).toBe(0);
    expect(new Cell([[]], 0, 0).liveNeighborCount).toBe(0);
  });

  test("returns 0 when cell has no living neighbors", () => {
    expect(new Cell([[0]], 0, 0).liveNeighborCount).toBe(0);
  });

  test("counts live neighbors directly above and beside the given cell", () => {
    const board: gameBoard = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    expect(new Cell(board, 1, 1).liveNeighborCount).toBe(4);
  });

  test("counts live neighbors diagnally adjacent to the given cell", () => {
    const board: gameBoard = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    expect(new Cell(board, 1, 1).liveNeighborCount).toBe(4);
  });

  test("neighbors outside of the array bounds count as 0", () => {
    const board: gameBoard = [[0]];
    expect(new Cell(board, 0, 0).liveNeighborCount).toBe(0);
  });
});

describe("updateBoard", () => {
  test("updates the given coordinates with the given new value", () => {
    const board: gameBoard = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    expect(updateBoard(board, 1, 2, 1)[1][2]).toBe(1);
  });

  test("returns a copy of the original board", () => {
    const board: gameBoard = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    updateBoard(board, 1, 2, 1);
    expect(board[1][2]).toBe(0);
  });
});
