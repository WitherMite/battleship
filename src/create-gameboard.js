import createShip from "./create-ship.js";

export default function createGameboard() {
  const gameboard = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({ ship: null, isShot: false }))
  );

  function placeShip(coordinates, direction, shipType) {
    const ship = createShip(shipType);
    const [x, y] = [...coordinates];
    const isYAxis = direction === "up" || direction === "down";

    // board is a 2d array so x axis is a bit more complicated to place on as you have to get the same index out of multiple arrays
    if (isYAxis) {
      const shipTiles = gameboard[x].slice(...sliceShipSize(y));
      shipTiles.forEach((tile) => (tile.ship = ship));
    } else {
      const shipTiles = gameboard
        .slice(...sliceShipSize(x))
        .map((row) => row[y]);
      shipTiles.forEach((tile) => (tile.ship = ship));
    }

    function sliceShipSize(coord) {
      const isPositiveFacing = direction === "up" || direction === "right";
      return isPositiveFacing
        ? [coord, coord + ship.length]
        : [coord - ship.length + 1, coord + 1];
    }
  }

  return {
    placeShip,
    getState() {
      // does not copy ships' methods
      const boardDeepCopy = JSON.parse(JSON.stringify(gameboard));
      return boardDeepCopy;
    },
    receiveAttack(coordinates) {
      const [x, y] = [...coordinates];
      const target = gameboard[x][y];
      if (target.isShot)
        throw new Error("Tile already shot", { cause: coordinates });
      target.isShot = true;
      if (target.ship) {
        target.ship.hit();
        if (target.ship.isSunk()) {
          target.ship.sunk = true;
        }
        return true;
      }
      return false;
    },
  };
}
