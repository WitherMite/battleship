import createShip from "./create-ship.js";
import createEvent from "./create-event.js";

export default function createGameboard() {
  const boardSize = 10;
  const gameboard = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({ ship: null, shot: null }))
  );
  const activeShips = {
    carrier: null,
    battleship: null,
    destroyer: null,
    submarine: null,
    patrol: null,
  };
  const shipsPlacedEvent = createEvent();
  let allShipsPlaced = false;
  shipsPlacedEvent.addListener(() => (allShipsPlaced = true));

  function areValidCoordinates(coords) {
    return (
      Array.isArray(coords) &&
      coords.length === 2 &&
      coords.every(
        (n) => typeof n === "number" && n >= 0 && n < boardSize && n % 1 === 0
      )
    );
  }

  return {
    isDefeat: false,
    addShipsPlacedListener: shipsPlacedEvent.addListener,
    removeShipsPlacedListener: shipsPlacedEvent.removeListener,
    getState() {
      const boardDeepCopy = structuredClone(gameboard);
      console.table(boardDeepCopy);
      return boardDeepCopy;
    },
    getUnplacedShips() {
      return Object.keys(activeShips).filter((k) => activeShips[k] === null);
    },
    receiveAttack(coordinates) {
      if (this.isDefeat) throw new Error("All ships have been sunk");
      if (!allShipsPlaced) throw new Error("Some ships have not been placed");
      if (!areValidCoordinates(coordinates))
        throw new Error("Invalid coordinate pair", { cause: coordinates });

      const [x, y] = [...coordinates];
      const target = gameboard[x][y];
      if (target.shot)
        throw new Error("Tile already shot", { cause: coordinates });

      target.shot = { isHit: true };
      if (!target.ship) {
        target.shot.isHit = false;
        return;
      }

      target.ship.hit();
      if (target.ship.isSunk) {
        this.isDefeat = Object.values(activeShips).every((ship) => ship.isSunk);
      }
    },
    placeShip(coordinates, direction, shipType) {
      if (!areValidCoordinates(coordinates))
        throw new Error("Invalid coordinate pair", { cause: coordinates });
      if (activeShips[shipType])
        throw new Error("Ship already placed", { cause: shipType });

      const ship = createShip(shipType);
      const [x, y] = [...coordinates];
      const isYAxis = direction === "up" || direction === "down";

      const [sliceStart, sliceEnd] = [...sliceShipSize(isYAxis ? y : x)];
      function sliceShipSize(coord) {
        const isPositiveFacing = direction === "up" || direction === "right";
        return isPositiveFacing
          ? [coord, coord + ship.length]
          : [coord - ship.length + 1, coord + 1];
      }

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
      if (Object.values(activeShips).every((ship) => !!ship))
        shipsPlacedEvent.send();
    },
  };
}
