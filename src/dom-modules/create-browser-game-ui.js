import drawGameGrid from "./draw-game-grid.js";
import renderGameboard from "./render-gameboard.js";
import playerAttack from "./player-attack.js";
import playerPlaceShips from "./player-place-ships.js";
const gameWindow = document.querySelector(".game-window");
const winDialog = document.querySelector(".win-popup");

export default function createBrowserGameUI() {
  return {
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
