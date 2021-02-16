import React from "react";
import "./ControlPanel.css";

type ControlPanelProps = {
  updateGameState: () => void;
  tickCount: number;
  clearBoard: () => void;
};

function ControlPanel({
  updateGameState,
  tickCount,
  clearBoard,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <button onClick={updateGameState}>Next State</button>
      <button onClick={clearBoard}>Clear</button>
      <div data-testid="tickCount">Generation: {tickCount}</div>
    </div>
  );
}

export default ControlPanel;
