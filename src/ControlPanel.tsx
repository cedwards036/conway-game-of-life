import React from "react";
import "./ControlPanel.css";

type ControlPanelProps = {
  updateGameState: () => void;
  tickCount: number;
  isPlaying: boolean;
  toggleIsPlaying: () => void;
  clearBoard: () => void;
};

function ControlPanel({
  updateGameState,
  tickCount,
  isPlaying,
  toggleIsPlaying,
  clearBoard,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <button disabled={isPlaying} onClick={updateGameState}>
        Next State
      </button>
      <button name="play" onClick={toggleIsPlaying}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={clearBoard}>Clear</button>
      <div data-testid="tickCount">Generation: {tickCount}</div>
    </div>
  );
}

export default ControlPanel;
