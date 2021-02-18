import React from "react";
import { stateDesc } from "./lib/game-board";
import "./styles/ControlPanel.css";

type ControlPanelProps = {
  updateGameState: () => void;
  tickCount: number;
  isPlaying: boolean;
  toggleIsPlaying: () => void;
  clearBoard: () => void;
  speedFactor: number;
  setSpeedFactor: (speedFactor: number) => void;
  randomizeBoard: () => void;
  gameStateDesc: stateDesc;
};

function GameState({ gameStateDesc }: { gameStateDesc: stateDesc }) {
  function getDescription(): { text: string; class: string } {
    switch (gameStateDesc.name) {
      case "pregame":
        return { text: "The game hasn't started yet", class: "pregame" };
      case "ongoing":
        return { text: "This pattern is evolving", class: "ongoing" };
      case "dead":
        return {
          text: `This pattern died at generation ${gameStateDesc.startTick}`,
          class: "dead",
        };
      case "stabilized":
        return {
          text: `This pattern stabilized at generation ${gameStateDesc.startTick}`,
          class: "stabilized",
        };
      case "cycle":
        return {
          text: `This pattern developed into a cycle at generation ${gameStateDesc.startTick} with period length ${gameStateDesc.length}`,
          class: "cycle",
        };
      default:
        return { text: "", class: "" };
    }
  }
  const description = getDescription();
  return (
    <div className={`state-description ${description.class}`}>
      {description.text}
    </div>
  );
}

function ControlPanel({
  updateGameState,
  tickCount,
  isPlaying,
  toggleIsPlaying,
  clearBoard,
  speedFactor,
  setSpeedFactor,
  randomizeBoard,
  gameStateDesc,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-panel-row">
        <button disabled={isPlaying} onClick={updateGameState}>
          Next State
        </button>
        <button name="play" onClick={toggleIsPlaying}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={clearBoard}>Clear</button>
        <button onClick={randomizeBoard}>Randomize</button>
      </div>
      <div className="control-panel-row">
        <label htmlFor="speed">
          Speed:
          <input
            type="range"
            id="speed"
            min="0"
            max="9"
            value={speedFactor}
            onChange={(e) => setSpeedFactor(parseInt(e.target.value))}
          ></input>
        </label>
        <div data-testid="tickCount">Generation: {tickCount}</div>
      </div>
      <div className="control-panel-row">
        <GameState gameStateDesc={gameStateDesc} />
      </div>
    </div>
  );
}

export default ControlPanel;
