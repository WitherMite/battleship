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
//   dont hardcode config options
//   finish battleship todo's
//   create a setup menu
//   make cpu ai better
//   document api for Battleship fn

// better placement ui + better ship icons
//   https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

//   ship imgs?
//     https://www.vecteezy.com/vector-art/36645262-ship
//     https://www.vecteezy.com/vector-art/36645216-ship
//     https://www.vecteezy.com/vector-art/36645255-submarine
//     https://www.vecteezy.com/vector-art/36645205-ship
//     https://www.vecteezy.com/vector-art/36645266-military-ship

//     would need to add a property to ship tiles marking each boats' stern
//     so I know where to place imgs at
