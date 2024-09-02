import createShip from "./create-ship.js";

const boardSize = 10;

export default function createGameboard() {
  const gameboard = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({ ship: null, isShot: false }))
  );
  const activeShips = {
    carrier: null,
    battleship: null,
    destroyer: null,
    submarine: null,
    patrol: null,
  };
  let allShipsPlaced = false;

  function placeShip(coordinates, direction, shipType) {
    if (!areValidCoordinates(coordinates))
      throw new Error("Invalid coordinate pair", { cause: coordinates });
    if (activeShips[shipType])
      throw new Error("Ship already placed", { cause: shipType });

    const ship = createShip(shipType);
    const [x, y] = [...coordinates];
    const isYAxis = direction === "up" || direction === "down";
    const [sliceStart, sliceEnd] = [...sliceShipSize(isYAxis ? y : x)];

    if (sliceStart < 0 || sliceEnd > boardSize)
      throw new Error("Ship out of bounds", {
        cause: { coordinates, direction, shipType },
      });

    // board is a 2d array so x axis is a bit more complicated to place on as you have to get the same index out of multiple arrays
    const shipTiles = isYAxis
      ? gameboard[x].slice(sliceStart, sliceEnd)
      : gameboard.slice(sliceStart, sliceEnd).map((col) => col[y]);

    if (shipTiles.some((tile) => !!tile.ship))
      throw new Error("Ship would overlap another boat", {
        cause: { coordinates, direction, shipType },
      });

    shipTiles.forEach((tile) => (tile.ship = ship));
    activeShips[shipType] = ship;
    allShipsPlaced = Object.values(activeShips).every((ship) => !!ship);

    function sliceShipSize(coord) {
      const isPositiveFacing = direction === "up" || direction === "right";
      return isPositiveFacing
        ? [coord, coord + ship.length]
        : [coord - ship.length + 1, coord + 1];
    }
  }

  return {
    isDefeat: false,
    placeShip,
    getState() {
      // does not copy ships' methods
      const boardDeepCopy = JSON.parse(JSON.stringify(gameboard));
      return boardDeepCopy;
    },
    receiveAttack(coordinates) {
      if (this.isDefeat) throw new Error("All ships have been sunk");
      if (!allShipsPlaced) throw new Error("Some ships have not been placed");
      if (!areValidCoordinates(coordinates))
        throw new Error("Invalid coordinate pair", { cause: coordinates });

      const [x, y] = [...coordinates];
      const target = gameboard[x][y];
      if (target.isShot)
        throw new Error("Tile already shot", { cause: coordinates });

      const attack = { isHit: false, sunkShip: null };
      target.isShot = true;
      if (!target.ship) return attack;

      attack.isHit = target.ship.hit();
      if (target.ship.isSunk) {
        attack.sunkShip = target.ship.name;
        this.isDefeat = Object.values(activeShips).every((ship) => ship.isSunk);
      }
      return attack;
    },
  };
}

function areValidCoordinates(coords) {
  return (
    Array.isArray(coords) &&
    coords.length === 2 &&
    coords.every(
      (n) => typeof n === "number" && n >= 0 && n < boardSize && n % 1 === 0
    )
  );
}
