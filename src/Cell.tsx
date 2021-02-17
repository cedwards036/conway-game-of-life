import React from "react";
import "./styles/Cell.css";
import { cellValue } from "./lib/game-board";

export type toggleCellType = (cellRow: number, cellCol: number) => void;

type CellProps = {
  value: cellValue;
  row: number;
  col: number;
  toggleCell: toggleCellType;
  pauseGame: () => void;
};

function Cell({ value, row, col, toggleCell, pauseGame }: CellProps) {
  function handleClick() {
    toggleCell(row, col);
    pauseGame();
  }
  return (
    <div
      className={"cell" + (value === 1 ? " alive" : "")}
      onClick={handleClick}
      data-testid={`c${row}${col}`}
    ></div>
  );
}

export default Cell;
