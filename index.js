import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

const gameUI = createBrowserGameUI();
const battleship = Battleship(gameUI.createPlayerInput(), createCPUInput(10));
battleship.attachRenderer(gameUI.render);
battleship.play();

// TODO list:
//   finish battleship todo's
//   make cpu ai better
//   dont hardcode game config (boardsize, ships, etc.)
//   add player names, allow real players to add thiers
//   document api for Battleship fn
//   better ship icons
