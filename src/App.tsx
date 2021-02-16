import React, { useState } from "react";
import { gameBoard, cellValue, updateBoard } from "./lib/game-board";
import Board from "./Board";

function App() {
  const initialBoard: gameBoard = [
    [0, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ];
  const [board, setBoard] = useState(initialBoard);

  function toggleCell(cellRow: number, cellCol: number): void {
    const newValue: cellValue = board[cellRow][cellCol] === 1 ? 0 : 1;
    setBoard(updateBoard(board, cellRow, cellCol, newValue));
  }

  return <Board board={board} toggleCell={toggleCell} />;
}

export default App;
