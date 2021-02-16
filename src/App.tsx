import React, { useState } from "react";
import {
  nextBoard,
  cellValue,
  updateBoard,
  createEmptyBoard,
} from "./lib/game-board";
import Board from "./Board";
import ControlPanel from "./ControlPanel";

const BOARD_SIZE = 15;

function App() {
  const [board, setBoard] = useState(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));
  const [tickCount, setTickCount] = useState(0);

  function toggleCell(cellRow: number, cellCol: number): void {
    const newValue: cellValue = board[cellRow][cellCol] === 1 ? 0 : 1;
    setBoard(updateBoard(board, cellRow, cellCol, newValue));
  }

  function updateGameState(): void {
    setBoard(nextBoard(board));
    setTickCount(tickCount + 1);
  }

  function clearBoard(): void {
    setBoard(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));
    setTickCount(0);
  }

  return (
    <div className="app">
      <Board board={board} toggleCell={toggleCell} />
      <ControlPanel
        updateGameState={updateGameState}
        tickCount={tickCount}
        clearBoard={clearBoard}
      />
    </div>
  );
}

export default App;
