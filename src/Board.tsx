import React from "react";
import "./Board.css";
import Cell, { toggleCellType } from "./Cell";
import { gameBoard } from "./lib/game-board";

type BoardProps = {
  board: gameBoard;
  toggleCell: toggleCellType;
  pauseGame: () => void;
};

function Board({ board, toggleCell, pauseGame }: BoardProps) {
  const cells: React.ReactNode[] = board.map((row, i) =>
    row.map((cellValue, j) => {
      return (
        <Cell
          value={cellValue}
          row={i}
          col={j}
          toggleCell={toggleCell}
          pauseGame={pauseGame}
          key={`${i}${j}`}
        />
      );
    })
  );
  return <div className="board">{cells}</div>;
}

export default Board;
