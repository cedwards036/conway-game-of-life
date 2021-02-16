import React from "react";
import "./Cell.css";
import { cellValue } from "./lib/game-board";

export type toggleCellType = (cellRow: number, cellCol: number) => void;

type CellProps = {
  value: cellValue;
  row: number;
  col: number;
  toggleCell: toggleCellType;
};

function Cell({ value, row, col, toggleCell }: CellProps) {
  return (
    <div
      className={"cell" + (value === 1 ? " alive" : "")}
      onClick={() => toggleCell(row, col)}
      data-testid={`c${row}${col}`}
    ></div>
  );
}

export default Cell;
