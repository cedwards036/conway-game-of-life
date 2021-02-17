import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("tick count initializes to 0", () => {
  render(<App />);
  expect(screen.getByTestId("tickCount")).toHaveTextContent("0");
});

test("clicking a dead cell adds the 'alive' class to that cell", () => {
  render(<App />);
  userEvent.click(screen.getByTestId("c00"));
  expect(screen.getByTestId("c00")).toHaveClass("alive");
});

test("clicking a living cell removes the 'alive' class from that cell", () => {
  render(<App />);
  userEvent.click(screen.getByTestId("c00"));
  userEvent.click(screen.getByTestId("c00"));
  expect(screen.getByTestId("c00")).not.toHaveClass("alive");
});

test("clicking a cell while the game is playing pauses the game", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Play" }));
  // @ts-ignore
  act(() => jest.advanceTimersByTime(504.21));
  userEvent.click(screen.getByTestId("c00"));
  expect(screen.getByRole("button", { name: "Play" })).toHaveTextContent(
    "Play"
  );
  expect(screen.getByTestId("tickCount")).toHaveTextContent("3");
});

test("clicking 'Next State' button advances the game state", () => {
  render(<App />);
  userEvent.click(screen.getByTestId("c00"));
  userEvent.click(screen.getByTestId("c01"));
  userEvent.click(screen.getByTestId("c10"));
  userEvent.click(screen.getByRole("button", { name: "Next State" }));
  expect(screen.getByTestId("c11")).toHaveClass("alive");
});

test("clicking 'Next State' button increments the tick count", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Next State" }));
  userEvent.click(screen.getByRole("button", { name: "Next State" }));
  expect(screen.getByTestId("tickCount")).toHaveTextContent("2");
});

test("clicking 'Play' button starts automatic updates to tick count and game state", () => {
  render(<App />);
  userEvent.click(screen.getByTestId("c00"));
  userEvent.click(screen.getByTestId("c01"));
  userEvent.click(screen.getByTestId("c10"));
  userEvent.click(screen.getByRole("button", { name: "Play" }));
  // @ts-ignore
  act(() => jest.advanceTimersByTime(168.07));
  expect(screen.getByTestId("tickCount")).toHaveTextContent("1");
  expect(screen.getByTestId("c11")).toHaveClass("alive");
});

test("clicking 'Clear' button stops the game", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Play" }));
  // @ts-ignore
  act(() => jest.advanceTimersByTime(504.21));
  userEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(screen.getByRole("button", { name: "Play" })).toHaveTextContent(
    "Play"
  );
  expect(screen.getByTestId("tickCount")).toHaveTextContent("0");
});

test("clicking 'Clear' button kills all living cells", () => {
  render(<App />);
  userEvent.click(screen.getByTestId("c00"));
  userEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(screen.getByTestId("c00")).not.toHaveClass("alive");
});

test("clicking 'Clear' button resets tick count to 0", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Next State" }));
  userEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(screen.getByTestId("tickCount")).toHaveTextContent("0");
});

test("changing the speed factor affects the speed of the game", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Speed:"), {
    target: {
      value: 0,
    },
  });
  userEvent.click(screen.getByTestId("c00"));
  userEvent.click(screen.getByRole("button", { name: "Play" }));
  // @ts-ignore
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByTestId("tickCount")).toHaveTextContent("1");
  expect(screen.getByTestId("c00")).not.toHaveClass("alive");
});
