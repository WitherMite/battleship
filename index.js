import createBrowserGameUI from "./src/dom-modules/create-browser-game-ui.js";
import createCPUInput from "./src/create-cpu-input.js";
import Battleship from "./src/battleship.js";

startGame();
async function startGame() {
  const gameUI = createBrowserGameUI();
  const battleship = await Battleship(
    gameUI.createPlayerInput(),
    createCPUInput(10)
  );
  gameUI.setNewGameBtns(startGame);

  battleship.addChangeUIListener(gameUI.changeUI);
  battleship.addRenderer(gameUI.render);
  battleship.addWinListener(gameUI.showWinDialog);
  battleship.play();
}

// TODO list:
//   finish battleship todo's
//   better placement ui + better ship icons
//   create a setup menu
//   make cpu ai better
//   document api for Battleship fn
