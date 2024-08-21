import createGameboard from "./create-gameboard.js";

describe("Create valid gameboard objects", () => {
  const board = createGameboard();

  test("Gameboards are a 10X10 2d array", () => {
    const boardState = board.getState();
    const isTenByTen =
      boardState.length === 10 && boardState.every((col) => col.length === 10);

    expect(isTenByTen).toBe(true);
  });

  test("Gameboards contain tiles with ship and isShot properties", () => {
    const hasValidTiles = board
      .getState()
      .flat()
      .every((tile) => tile.ship === null && tile.isShot === false);
    expect(hasValidTiles).toBe(true);
  });
});

describe("Ships can be placed on gameboards", () => {
  let board;
  beforeEach(() => (board = createGameboard()));

  test.each([
    ["up", 4, 4, [4, 8]],
    ["down", 4, 4, [1, 5]],
  ])("Ship pointed %s", (direction, x, y, sliceArgs) => {
    board.placeShip([x, y], direction, "battleship");
    const boardState = board.getState();
    const shipTiles = boardState[x].slice(...sliceArgs);

    expect(shipTiles.every((tile) => tile.ship.name === "battleship")).toBe(
      true
    );
  });
  test.each([
    ["left", 4, 4, [1, 5]],
    ["right", 4, 4, [4, 8]],
  ])("Ship pointed %s", (direction, x, y, sliceArgs) => {
    board.placeShip([x, y], direction, "battleship");
    const boardState = board.getState();
    const shipTiles = boardState.slice(...sliceArgs).map((row) => row[y]);

    expect(shipTiles.every((tile) => tile.ship.name === "battleship")).toBe(
      true
    );
  });

  test("Ships cannot be partially off the board", () => {});

  test("Ships cannot share tiles", () => {
    board.placeShip([6, 7], "left", "carrier");
    expect(() => board.placeShip([1, 7], "right", "battleship")).toThrow();
  });

  test("Can only place one of each ship type", () => {});
});

describe("Gameboards can recieve attacks", () => {
  const board = createGameboard();
  board.placeShip([4, 2], "right", "carrier");

  test("Only full boards can be attacked", () => {});
  // fill board

  test.each([
    [0, 0],
    [9, 3],
    [4, 1],
  ])("Attack [%s,%s] and miss", (x, y) => {
    const attack = board.receiveAttack([x, y]);
    const boardState = board.getState();
    const isSuccessfulMiss = boardState[x][y].isShot && !attack.isHit;
    expect(isSuccessfulMiss).toBe(true);
  });
  test.each([
    [4, 2],
    [8, 2],
    [5, 2],
  ])("Attack [%s,%s] and hit", (x, y) => {
    const attack = board.receiveAttack([x, y]);
    const boardState = board.getState();
    const isSuccessfulHit = boardState[x][y].isShot && attack.isHit;
    expect(isSuccessfulHit).toBe(true);
  });
  test("Boards' ships sink", () => {
    board.receiveAttack([6, 2]);
    const attack = board.receiveAttack([7, 2]);
    expect(attack.sunkShip === "carrier").toBe(true);
  });
  test("Cannot attack the same tile more than once", () => {
    expect(() => board.receiveAttack([0, 0])).toThrow();
  });
});

describe("Gameboards report losses to listeners", () => {});

test("Methods only accept valid coordinate pairs", () => {
  const board = createGameboard();
  expect(() => board.placeShip([10, 1], "right", "battleship")).toThrow();
  expect(() => board.placeShip([-1, 1], "up", "carrier")).toThrow();
  expect(() => board.receiveAttack([4, 12])).toThrow();
  expect(() => board.receiveAttack(["a", 1])).toThrow();
});
