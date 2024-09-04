import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import Battleship from "./src/battleship.js";

const battleship = Battleship();
const gameUI = createBrowserGameUI();
battleship.attachRenderer(gameUI.render);
battleship.play();

// TODO list:
//   get game loop working
//   dont hardcode game config (boardsize, ships, etc.)
//   document api for Battleship fn
