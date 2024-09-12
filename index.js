import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

const gameUI = createBrowserGameUI();
const battleship = await Battleship(
  gameUI.createPlayerInput(),
  createCPUInput(10)
);
battleship.addChangeUIListener(gameUI.changeUI);
battleship.attachRenderer(gameUI.render);
battleship.addWinListener(gameUI.showWinDialog);
battleship.play();

// TODO list:
//   finish battleship todo's
//   make new/restart game buttons
//   better placement ui + better ship icons
//   make cpu ai better
//   document api for Battleship fn
