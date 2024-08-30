import drawGameGrid from "./src/dom-modules/draw-game-grid.js";

const grids = document.querySelectorAll(".game-grid");

grids.forEach((grid) => drawGameGrid(grid, 10));
