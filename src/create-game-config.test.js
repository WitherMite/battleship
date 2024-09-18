import createGameConfig from "./create-game-config.js";

function isValidBoardSize(boardSize) {
  return (
    typeof boardSize === "number" &&
    boardSize >= 5 &&
    boardSize <= 26 &&
    boardSize % 1 === 0
  );
}

function isValidShipObj(ship) {
  return (
    typeof ship.name === "string" &&
    typeof ship.length === "number" &&
    ship.length % 1 === 0
  );
}

describe("Returns a config object with valid properties", () => {
  const config = createGameConfig();
  test("boardSize is an integer between 5 and 26", () => {
    expect(isValidBoardSize(config.boardSize)).toBe(true);
  });
  describe("Ships is an object containing valid ship config objects", () => {
    Object.keys(config.ships).forEach((key) => {
      test(`ships.${key} is valid`, () => {
        expect(isValidShipObj(config.ships[key])).toBe(true);
      });
    });
  });
});

describe("Has safe methods to change config", () => {
  let config;
  beforeEach(() => {
    config = createGameConfig();
  });

  describe("Can replace config all at once", () => {
    test("Works when passed correct object", () => {
      const newConfig = {
        boardSize: 26,
        ships: {
          hello: { name: "hello", length: 2 },
          world: { name: "world", length: 5 },
          key: { name: "foo", length: 6 },
        },
      };
      config.setConfig(newConfig);
      expect(config.boardSize).toBe(newConfig.boardSize);
      expect(config.ships).toMatchObject(newConfig.ships);
    });
    test.each([
      [{ boardSize: 5, ships: "foo" }],
      [{ boardSize: 27, foo: 42 }],
      [null],
      [1],
      ["hi"],
    ])("Throws when passed invalid arg %s", (arg) => {
      expect(() => config.setConfig(arg)).toThrow();
    });
  });

  describe("Can change board size", () => {
    test.each([[5], [7], [10], [26]])("Works when passed %s", (num) => {
      config.setSize(num);
      expect(config.boardSize).toBe(num);
    });
    test.each([[4], [27], [10.5], [null], ["hi"]])(
      "Throws when passed %s",
      (arg) => {
        expect(() => config.setSize(arg)).toThrow();
      }
    );
  });

  describe("Can add ship types", () => {
    test.each([
      [{ name: "yacht", length: 3 }],
      [{ name: "buoy", length: 1 }],
      [{ name: "long", length: 7 }],
    ])("Adds ship when passed %s, uses name property as key", (ship) => {
      config.addShip(ship);
      expect(config.ships[ship.name]).toBe(ship);
    });
    test("Can optionally give a string to use for the ship's key", () => {
      const ship = { name: "yep", length: 6 };
      config.addShip(ship, "foo");
      expect(config.ships.foo).toBe(ship);
    });
    test.each([
      [{ hello: "world" }],
      [1],
      [null],
      ["fsdfas"],
      [{ name: "split", length: 3.5 }],
    ])("Throws when passed %s", (arg) => {
      expect(() => config.addShip(arg)).toThrow();
    });
  });
  describe("Can remove ship types", () => {
    test.each([["destroyer"], ["carrier"], ["patrol"]])(
      "Removes ship when passed ship's name/key %s",
      (key) => {
        config.removeShip(key);
        expect(config.ships[key]).toBe(undefined);
      }
    );
    test.each([[1], [null], [{ name: "battleship", length: 4 }]])(
      "Throws when passed %s as its not a valid key",
      (arg) => {
        expect(() => config.removeShip(arg)).toThrow();
      }
    );
  });

  test("Can reset config to default", () => {
    config.setSize(26);
    config.removeShip("carrier");
    config.addShip({ name: "wow", length: 100 });
    config.setToDefault();
    expect(config.boardSize).toBe(10);
    expect(config.ships.carrier).toMatchObject({ name: "carrier", length: 5 });
    expect(config.ships.wow).toBe(undefined);
  });
});
