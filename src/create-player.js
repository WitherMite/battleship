import createGameboard from "./create-gameboard.js";

export default function createPlayer() {
  const board = createGameboard();
  // temporary setup
  board.placeShip([4, 2], "right", "carrier");
  board.placeShip([4, 4], "up", "battleship");
  board.placeShip([8, 5], "down", "destroyer");
  board.placeShip([2, 3], "left", "submarine");
  board.placeShip([0, 8], "right", "patrol");

  return {
    board,
  };
}
