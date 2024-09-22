import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

startGame();
async function startGame() {
  const gameUI = createBrowserGameUI();
  gameUI.setNewGameBtns(startGame);
  const opponent = await gameUI.chooseOpponent(createCPUInput);
  const battleship = await Battleship(gameUI.createPlayerInput(), opponent);

  battleship.addChangeUIListener(gameUI.changeUI);
  battleship.addRenderer(gameUI.render);
  battleship.addWinListener(gameUI.showWinDialog);
  battleship.play();
}

// TODO list:
//   finish battleship todo's
//   better placement ui + better ship icons
//   add a turn change confirmation when opponent is a player
//   document api for Battleship fn
