import React, { useEffect, useState, useCallback } from "react";
import {
  nextBoard,
  cellValue,
  updateBoard,
  createEmptyBoard,
} from "./lib/game-board";
import Board from "./Board";
import ControlPanel from "./ControlPanel";
import "./App.css";

const BOARD_SIZE = 15;

function App() {
  const [board, setBoard] = useState(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));
  const [tickCount, setTickCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleCell(cellRow: number, cellCol: number): void {
    const newValue: cellValue = board[cellRow][cellCol] === 1 ? 0 : 1;
    setBoard(updateBoard(board, cellRow, cellCol, newValue));
  }

  const updateGameState = useCallback(() => {
    setBoard(nextBoard(board));
    setTickCount(tickCount + 1);
  }, [tickCount, board]);

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  function pauseGame() {
    setIsPlaying(false);
  }

  function clearBoard(): void {
    setBoard(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));
    setTickCount(0);
    pauseGame();
  }

  useEffect(() => {
    let interval: number = 0;
    if (isPlaying) {
      interval = window.setInterval(() => {
        updateGameState();
      }, 500);
    } else if (!isPlaying && tickCount !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, updateGameState, tickCount]);

  return (
    <div className="app">
      <header>Conway's Game of Life</header>
      <Board board={board} toggleCell={toggleCell} pauseGame={pauseGame} />
      <ControlPanel
        updateGameState={updateGameState}
        tickCount={tickCount}
        isPlaying={isPlaying}
        toggleIsPlaying={toggleIsPlaying}
        clearBoard={clearBoard}
      />
    </div>
  );
}

export default App;
