import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

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
