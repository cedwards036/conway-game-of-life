import React from "react";
import "./Board.css";
import Cell from "./Cell";
import { cellValue } from "./lib/game-board";

type BoardProps = { board: cellValue[][] };

function Board({ board }: BoardProps) {
  const cells: React.ReactNode[] = board.map((row, i) =>
    row.map((cellValue, j) => {
      return <Cell value={cellValue} row={i} col={j} key={`${i}${j}`} />;
    })
  );
  return <div className="board">{cells}</div>;
}

export default Board;
