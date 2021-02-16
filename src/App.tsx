import React from "react";
import Board from "./Board";

function App() {
  return (
    <Board
      board={[
        [0, 0, 0, 1],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ]}
    />
  );
}

export default App;
