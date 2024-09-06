import createGameboard from "./create-gameboard.js";

export default function createPlayer(input = {}) {
  const board = createGameboard();
  // temporary setup
  board.placeShip([4, 2], "right", "carrier");
  board.placeShip([4, 4], "up", "battleship");
  board.placeShip([8, 5], "down", "destroyer");
  board.placeShip([2, 3], "left", "submarine");
  board.placeShip([0, 8], "right", "patrol");

  return {
    board,
    getRadar() {
      const boardState = board.getState();
      const radar = boardState.map((col) =>
        col.map((tile) => {
          if (!tile.ship?.isSunk) tile.ship = null;
          return tile;
        })
      );
      return radar;
    },
    ...input,
  };
}
