import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import Battleship from "./src/battleship.js";

const gameUI = createBrowserGameUI();
const battleship = Battleship(
  gameUI.createPlayerInput(),
  gameUI.createPlayerInput()
);
battleship.attachRenderer(gameUI.render);
battleship.play();

// TODO list:
//   get game loop working
//   add computer player
//   dont hardcode game config (boardsize, ships, etc.)
//   document api for Battleship fn
