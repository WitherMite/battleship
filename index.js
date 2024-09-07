import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

const gameUI = createBrowserGameUI();
const battleship = Battleship(gameUI.createPlayerInput(), createCPUInput(10));
battleship.attachRenderer(gameUI.render);
battleship.play();

// TODO list:
//   add computer player
//   finish battleship todo's
//   dont hardcode game config (boardsize, ships, etc.)
//   better ship icons
//   document api for Battleship fn
