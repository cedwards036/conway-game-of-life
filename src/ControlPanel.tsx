import React from "react";
import "./ControlPanel.css";

type ControlPanelProps = {
  updateGameState: () => void;
  tickCount: number;
  isPlaying: boolean;
  toggleIsPlaying: () => void;
  clearBoard: () => void;
  speedFactor: number;
  setSpeedFactor: (speedFactor: number) => void;
};

function ControlPanel({
  updateGameState,
  tickCount,
  isPlaying,
  toggleIsPlaying,
  clearBoard,
  speedFactor,
  setSpeedFactor,
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
      <label htmlFor="speed">Speed:</label>
      <input
        type="range"
        id="speed"
        min="0"
        max="9"
        value={speedFactor}
        onChange={(e) => setSpeedFactor(parseInt(e.target.value))}
      ></input>
      <div data-testid="tickCount">Generation: {tickCount}</div>
    </div>
  );
}

export default ControlPanel;
