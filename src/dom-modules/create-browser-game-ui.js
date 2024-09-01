import drawGameGrid from "./draw-game-grid.js";
const gameWindow = document.querySelector(".game-window");

export default function createBrowserGameUI() {
  return {
    render(radarState, boardState) {
      const grids = gameWindow.querySelectorAll(".game-grid");
      grids.forEach((grid) => drawGameGrid(grid, boardState.length));

      // render radar / opponent board
      // render player board
    },
  };
}
