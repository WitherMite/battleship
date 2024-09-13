import drawGameGrid from "./draw-game-grid.js";
import renderGameboard from "./render-gameboard.js";
import drawShipPlacementUI from "./draw-ship-placement-ui.js";
import drawGameplayUI from "./draw-gameplay-ui.js";
import playerAttack from "./player-attack.js";
import playerPlaceShips from "./player-place-ships.js";

export default function createBrowserGameUI() {
  const gameWindow = document.querySelector(".game-window");
  const winDialog = document.querySelector(".win-popup");
  return {
    setNewGameBtns(callback) {
      const btns = document.querySelectorAll(".restart-btn");
      btns.forEach((btn) => btn.addEventListener("click", callback));
      winDialog.close();
    },

    render(boardState, radarState) {
      const grids = gameWindow.querySelectorAll(".game-grid");
      grids.forEach((grid) => drawGameGrid(grid, boardState.length));

      const playerBoard = gameWindow.querySelector(
        ".player-board .game-tile-container"
      );
      renderGameboard(playerBoard, boardState);
      if (radarState) {
        const playerRadar = gameWindow.querySelector(
          ".radar .game-tile-container"
        );
        renderGameboard(playerRadar, radarState);
      }
    },

    changeUI(uiType, playerPov) {
      switch (uiType) {
        case "place-ships":
          return drawShipPlacementUI(playerPov);
        case "gameplay":
          return drawGameplayUI();
      }
    },

    showWinDialog(player) {
      const message = `Winner: ${player.name}`;
      const msgEle = winDialog.querySelector(".win-msg");
      msgEle.textContent = message;
      winDialog.showModal();
    },

    createPlayerInput() {
      return {
        povType: "human",
        attack: playerAttack,
        placeShips: playerPlaceShips,
        name: (() => {
          // change name input
          const name =
            ""; /* prompt("Pick a name") - the blocking is annoying */
          return name ? name : "Player";
        })(),
      };
    },
  };
}
