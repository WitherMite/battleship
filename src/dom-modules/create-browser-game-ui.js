import drawGameGrid from "./draw-game-grid.js";
import renderGameboard from "./render-gameboard.js";
import playerAttack from "./player-attack.js";
const gameWindow = document.querySelector(".game-window");

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

    createPlayerInput() {
      return {
        povType: "human",
        attack: playerAttack,
      };
    },
  };
}
