import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

const gameUI = createBrowserGameUI();
gameUI.setNewGameBtns(() => window.location.reload());
const opponent = await gameUI.chooseOpponent(createCPUInput);
const battleship = await Battleship(gameUI.createPlayerInput(), opponent);

battleship.addChangeUIListener(gameUI.changeUI);
battleship.addRenderer(gameUI.render);
battleship.addWinListener(gameUI.showWinDialog);
battleship.play();

// TODO list:
//   document api for Battleship fn
