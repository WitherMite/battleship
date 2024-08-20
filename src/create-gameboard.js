import createShip from "./create-ship.js";

const boardSize = 10;

export default function createGameboard() {
  const gameboard = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({ ship: null, isShot: false }))
  );

  function placeShip(coordinates, direction, shipType) {
    if (!areValidCoordinates(coordinates))
      throw new Error("Invalid coordinate pair", { cause: coordinates });
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
      if (!areValidCoordinates(coordinates))
        throw new Error("Invalid coordinate pair", { cause: coordinates });
      const [x, y] = [...coordinates];
      const target = gameboard[x][y];
      if (target.isShot)
        throw new Error("Tile already shot", { cause: coordinates });

      const attack = { isHit: false, sunkShip: null };
      target.isShot = true;
      if (target.ship) {
        attack.isHit = target.ship.hit();
        if (target.ship.isSunk()) {
          attack.sunkShip = target.ship.name;
        }
      }
      return attack;
    },
  };
}

function areValidCoordinates(coords) {
  return (
    Array.isArray(coords) &&
    coords.length === 2 &&
    coords.every((n) => typeof n === "number") &&
    coords.every((n) => n >= 0 && n % 1 === 0) &&
    coords[0] < boardSize &&
    coords[1] < boardSize
  );
}
