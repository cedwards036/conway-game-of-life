import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Christopher Edwards |{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/cedwards036/conway-game-of-life"
      >
        Github
      </a>
    </footer>
  );
}

export default Footer;
