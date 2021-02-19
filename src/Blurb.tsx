import React from "react";
import "./styles/Blurb.css";

function Blurb() {
  return (
    <article className="blurb">
      <section>
        <h1>About</h1>
        The{" "}
        <a
          href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
          target="_blank"
          rel="noreferrer"
        >
          Game of Life
        </a>{" "}
        is a zero-player game created by British mathematician John Conway in
        1970 as an attempt to define an "interesting and unpredictable{" "}
        <a
          href="https://en.wikipedia.org/wiki/Cellular_automaton"
          target="_blank"
          rel="noreferrer"
        >
          cell automaton
        </a>
        ". It involves a grid of "cells" which are born, live, and die based on
        a very short list of simple yet powerful rules. While the "pure" version
        of the game is played on an infinite board, for practical reasons I have
        constrained this simple simulation to a 15x15 grid that "wraps around"
        itself; i.e. the rightmost cells and the leftmost cells are treated as
        adjacent, same with the top and bottom rows of cells, and so on.
      </section>
      <section>
        <h1>The Rules</h1>
        The game progresses in a series of discrete steps, called "generations"
        or "ticks". All cell deaths and births happen simultaneously, during the
        transition from one state to the next. The simple rules which govern
        which cells live and die in each generation are as follows:
        <ul>
          <li>A living cell with either two or three neighbors survives</li>
          <li>
            A dead cell with exactly three living neighbors is "born", and
            becomes a live cell
          </li>
          <li>
            All other living cells die, and all other dead cells remain dead
          </li>
        </ul>
        These rules allow even very minimal starting configurations to "evolve"
        in surprising and interesting ways. There are even configurations
        capable of simulating addition, boolean logic, and a full finite
        state-machine (the Game of Life is in fact Turing Complete). For further
        reading, and for some examples of simple-yet-interesting patterns, I
        recommend{" "}
        <a
          href="http://pi.math.cornell.edu/~lipa/mec/lesson6.html"
          target="_blank"
          rel="noreferrer"
        >
          this article
        </a>{" "}
        from the Cornell Math Explorer's Club.
      </section>
    </article>
  );
}

export default Blurb;
