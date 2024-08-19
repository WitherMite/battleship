import createGameboard from "./create-gameboard.js";
import createShip from "./create-ship.js";

describe("Create valid gameboard objects", () => {
  const board = createGameboard();

  test("Gameboards are a 10X10 2d array", () => {
    const boardState = board.getState();
    const isTenByTen =
      boardState.length === 10 && boardState.every((col) => col.length === 10);

    expect(isTenByTen).toBe(true);
  });

  test("Gameboards contain tiles with ship and isShot properties", () => {
    const hasValidTiles = board.getState().every((col) => {
      return col.every((tile) => tile.ship === null && tile.isShot === false);
    });
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
});

describe("Gameboards can recieve attacks", () => {
  const board = createGameboard();
  board.placeShip([4, 2], "right", "carrier");

  test.each([
    [0, 0],
    [9, 3],
    [4, 1],
  ])("Attack [%s,%s] and miss", (x, y) => {
    const attackHit = board.receiveAttack([x, y]);
    const boardState = board.getState();
    const isSuccessfulMiss = boardState[x][y].isShot && !attackHit;
    expect(isSuccessfulMiss).toBe(true);
  });
  test.each([
    [4, 2],
    [8, 2],
    [5, 2],
  ])("Attack [%s,%s] and hit", (x, y) => {
    const attackHit = board.receiveAttack([x, y]);
    const boardState = board.getState();
    const isSuccessfulHit = boardState[x][y].isShot && attackHit;
    expect(isSuccessfulHit).toBe(true);
  });
  test("Boards' ships sink", () => {
    board.receiveAttack([6, 2]);
    const attackHit = board.receiveAttack([7, 2]);
    const boardState = board.getState();
    const boatFront = boardState[4][2].ship;
    const boatBack = boardState[7][2].ship;
    const boatIsSunk = boatFront.sunk && boatBack.sunk && attackHit;
    expect(boatIsSunk).toBe(true);
  });
});
