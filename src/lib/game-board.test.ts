import {
  nextBoard,
  gameBoard,
  Cell,
  updateBoard,
  boardToString,
  deriveGameStateDesc,
} from "./game-board";

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
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
  ];
  expect(nextBoard(board)[1][1]).toBe(1);
});

describe("Cell.liveNeighborCount", () => {
  test("returns 0 when cell has no living neighbors", () => {
    const board: gameBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(new Cell(board, 1, 1).liveNeighborCount).toBe(0);
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

  test("counts wrap-around neighbors to the right", () => {
    const board: gameBoard = [
      [0, 0, 0],
      [1, 0, 1],
      [0, 0, 0],
    ];
    expect(new Cell(board, 1, 2).liveNeighborCount).toBe(1);
  });

  test("counts wrap-around neighbors to the left", () => {
    const board: gameBoard = [
      [0, 0, 0],
      [1, 0, 1],
      [0, 0, 0],
    ];
    expect(new Cell(board, 1, 0).liveNeighborCount).toBe(1);
  });

  test("counts wrap-around neighbors above", () => {
    const board: gameBoard = [
      [1, 0, 0],
      [0, 0, 0],
      [1, 0, 0],
    ];
    expect(new Cell(board, 0, 0).liveNeighborCount).toBe(1);
  });

  test("counts wrap-around neighbors below", () => {
    const board: gameBoard = [
      [1, 0, 0],
      [0, 0, 0],
      [1, 0, 0],
    ];
    expect(new Cell(board, 2, 0).liveNeighborCount).toBe(1);
  });

  test("counts diagonal wrap-around neighbors below", () => {
    const board: gameBoard = [
      [0, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ];
    expect(new Cell(board, 0, 1).liveNeighborCount).toBe(3);
    expect(new Cell(board, 0, 2).liveNeighborCount).toBe(2);
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

  test("returns an updated *copy* of the original board", () => {
    const board: gameBoard = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ];
    updateBoard(board, 1, 2, 1);
    expect(board[1][2]).toBe(0);
  });
});

describe("boardToString", () => {
  test("converts an empty board to an empty string", () => {
    expect(boardToString([])).toEqual("");
    expect(boardToString([[]])).toEqual("");
  });

  test("converts a non-empty board into a string of ones and zeros with periods separating the 'rows'", () => {
    expect(
      boardToString([
        [0, 1, 1],
        [1, 0, 1],
      ])
    ).toEqual("011.101");
  });
});

describe("deriveGameState", () => {
  test("game state is pregame if the history is empty", () => {
    expect(deriveGameStateDesc({}, "101.111", 0)).toEqual({ name: "pregame" });
  });

  test("game state is ongoing if the current state has never happened before", () => {
    expect(deriveGameStateDesc({ "101.001": 0 }, "101.111", 1)).toEqual({
      name: "ongoing",
    });
  });

  test("game state is dead with startTick equal to the current tick if the current state has no living cells", () => {
    expect(
      deriveGameStateDesc({ "000.000.000": 0 }, "000.000.000", 23)
    ).toEqual({
      name: "dead",
      startTick: 23,
    });
  });

  test("game state is stabilized with startTick = currentTick - 1 if the current state is the same as last tick", () => {
    expect(deriveGameStateDesc({ "101.001": 1 }, "101.001", 2)).toEqual({
      name: "stabilized",
      startTick: 1,
    });
  });

  test("game state is cycle with startTick = first occurance tick and endTick = current tick if the current state is the same as a state before the last state", () => {
    expect(deriveGameStateDesc({ "101.001": 1 }, "101.001", 3)).toEqual({
      name: "cycle",
      startTick: 1,
      length: 2,
    });
  });
});
