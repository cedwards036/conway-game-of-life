import React, { useEffect, useState, useCallback } from "react";
import {
  nextBoard,
  cellValue,
  updateBoard,
  createEmptyBoard,
  createRandomBoard,
  boardToString,
  deriveGameStateDesc,
  stateHistory,
  stateDesc,
} from "./lib/game-board";
import Board from "./Board";
import ControlPanel from "./ControlPanel";
import Footer from "./Footer";
import "./styles/App.css";

const BOARD_SIZE = 15;

function App() {
  const [board, setBoard] = useState(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));
  const [tickCount, setTickCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedFactor, setSpeedFactor] = useState(5);
  const [history, setHistory] = useState<stateHistory>({});
  const [mostRecentStateDesc, setMostRecentStateDesc] = useState<stateDesc>({
    name: "pregame",
  });

  const addCurrentStateToHistory = useCallback(() => {
    const newHistory = { ...history };
    newHistory[boardToString(board)] = tickCount;
    const currentStateDesc = deriveGameStateDesc(
      newHistory,
      boardToString(nextBoard(board)),
      tickCount + 1
    );
    if (currentStateDesc.name !== mostRecentStateDesc.name) {
      setMostRecentStateDesc(currentStateDesc);
    }
    console.log(history, newHistory, mostRecentStateDesc, currentStateDesc);
    setHistory(newHistory);
  }, [history, board, tickCount, mostRecentStateDesc]);

  function toggleCell(cellRow: number, cellCol: number): void {
    const newValue: cellValue = board[cellRow][cellCol] === 1 ? 0 : 1;
    setBoard(updateBoard(board, cellRow, cellCol, newValue));
  }

  const updateGameState = useCallback(() => {
    addCurrentStateToHistory();
    setBoard(nextBoard(board));
    setTickCount(tickCount + 1);
  }, [tickCount, board, addCurrentStateToHistory]);

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  function pauseGame() {
    setIsPlaying(false);
  }

  function clearBoard(): void {
    clearHistory();
    setBoard(createEmptyBoard(BOARD_SIZE, BOARD_SIZE));
    setTickCount(0);
    pauseGame();
  }

  function randomizeBoard(): void {
    clearHistory();
    setBoard(createRandomBoard(BOARD_SIZE, BOARD_SIZE));
    setTickCount(0);
    pauseGame();
  }

  function clearHistory(): void {
    setHistory({});
    setMostRecentStateDesc({ name: "pregame" });
  }

  useEffect(() => {
    let interval: number = 0;
    const intervalTime = 1000 * Math.pow(0.7, speedFactor);
    if (isPlaying) {
      interval = window.setInterval(() => {
        updateGameState();
      }, intervalTime);
    } else if (!isPlaying && tickCount !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, updateGameState, tickCount, speedFactor]);

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
        speedFactor={speedFactor}
        setSpeedFactor={setSpeedFactor}
        randomizeBoard={randomizeBoard}
        gameStateDesc={mostRecentStateDesc}
      />
      <Footer />
    </div>
  );
}

export default App;
