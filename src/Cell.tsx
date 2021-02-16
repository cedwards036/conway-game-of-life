import React from "react";
import "./Cell.css";
import { cellValue } from "./lib/game-board";

type CellProps = { value: cellValue; row: number; col: number };

function Cell({ value, row, col }: CellProps) {
  return <div className={"cell" + (value === 1 ? " alive" : "")}>{value}</div>;
}

export default Cell;
