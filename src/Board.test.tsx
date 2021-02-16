import React from "react";
import { render } from "@testing-library/react";
import Board from "./Board";

test("Board renders a cell node for each cell in the board", () => {
  const { container } = render(
    <Board
      board={[
        [0, 0, 0],
        [0, 0, 0],
      ]}
    />
  );
  expect(container.firstChild?.childNodes.length).toBe(6);
});
