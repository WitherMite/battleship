export default function createGameConfig() {
  const defaults = {
    boardSize: 10,
    ships: {
      carrier: { name: "carrier", length: 5 },
      battleship: { name: "battleship", length: 4 },
      destroyer: { name: "destroyer", length: 3 },
      submarine: { name: "submarine", length: 3 },
      patrol: { name: "patrol", length: 2 },
    },
  };
  return {
    ...structuredClone(defaults),

    setConfig(configObj) {
      if (typeof configObj !== "object")
        throw new Error("Argument is not an object", { cause: configObj });
      if (!isValidBoardSize(configObj.boardSize))
        throw new Error("Board size property is not an integer from 5 - 26", {
          cause: configObj.boardSize,
        });
      if (!isValidShipsObj(configObj.ships))
        throw new Error("Invalid ship types property", {
          cause: configObj.ships,
        });
      this.boardSize = configObj.boardSize;
      this.ships = configObj.ships;
    },

    setSize(size) {
      if (!isValidBoardSize(size))
        throw new Error("Argument is not an integer from 5 - 26", {
          cause: size,
        });
      this.boardSize = size;
    },

    addShip(shipObj, key) {
      if (!isValidShipConfig(shipObj))
        throw new Error("Argument is not a valid ship config object", {
          cause: shipObj,
        });
      this.ships[typeof key === "string" ? key : shipObj.name] = shipObj;
    },
    removeShip(shipName) {
      if (typeof shipName !== "string")
        throw new Error("Argument is not a string", { cause: shipName });
      delete this.ships[shipName];
    },

    setToDefault() {
      [this.boardSize, this.ships] = [defaults.boardSize, defaults.ships];
    },
  };
}

function isValidBoardSize(boardSize) {
  return (
    typeof boardSize === "number" &&
    boardSize >= 5 &&
    boardSize <= 26 &&
    boardSize % 1 === 0
  );
}

function isValidShipsObj(ships) {
  return Object.values(ships).every(isValidShipConfig);
}

function isValidShipConfig(ship) {
  return (
    typeof ship.name === "string" &&
    typeof ship.length === "number" &&
    ship.length % 1 === 0
  );
}
