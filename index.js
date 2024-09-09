import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

const gameUI = createBrowserGameUI();
const battleship = await Battleship(
  gameUI.createPlayerInput(),
  createCPUInput(10)
);
battleship.attachRenderer(gameUI.render);
battleship.addWinListener(gameUI.showWinDialog);
battleship.play();

// TODO list:
//   finish battleship todo's
//   better placement ui
//   make cpu ai better
//   document api for Battleship fn
//   better ship icons
