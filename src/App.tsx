import React, { useState } from "react";
import { cellValue, updateBoard, createEmptyBoard } from "./lib/game-board";
import Board from "./Board";

const BOARD_SIZE = 15;

function App() {
  const [board, setBoard] = useState(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));

  function toggleCell(cellRow: number, cellCol: number): void {
    const newValue: cellValue = board[cellRow][cellCol] === 1 ? 0 : 1;
    setBoard(updateBoard(board, cellRow, cellCol, newValue));
  }

  return <Board board={board} toggleCell={toggleCell} />;
}

export default App;
