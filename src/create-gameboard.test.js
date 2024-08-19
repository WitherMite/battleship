import createGameboard from "./create-gameboard.js";

describe("Create valid gameboard objects", () => {
  const board = createGameboard();

  test("Gameboards are a 10X10 2d array", () => {
    const boardState = board.getState();
    const isTenByTen =
      boardState.length === 10 && boardState.every((col) => col.length === 10);

    expect(isTenByTen).toBe(true);
  });

  test("Gameboards contain tiles with ship and isHit properties", () => {
    const hasValidTiles = board.getState().every((col) => {
      return col.every((tile) => tile.ship === null && tile.isHit === false);
    });
    expect(hasValidTiles).toBe(true);
  });
});

describe("Ships can be placed on gameboards", () => {
  let board;
  beforeEach(() => (board = createGameboard()));

  test.each([
    ["up", 3, 0],
    ["down", 4, 4],
  ])("Ship pointed %s", (direction, x, y) => {
    board.placeShip([x, y], direction, "battleship");
    const boardState = board.getState();
    const shipTiles = boardState[x].slice(0, y + 1);

    expect(shipTiles.every((tile) => tile.ship.name === "battleship")).toBe(
      true
    );
  });
  test.each([
    ["left", 4, 4],
    ["right", 0, 3],
  ])("Ship pointed %s", (direction, x, y) => {
    board.placeShip([x, y], direction, "battleship");
    const boardState = board.getState();
    const shipTiles = boardState.slice(0, x + 1).map((row) => row[y]);

    expect(shipTiles.every((tile) => tile.ship.name === "battleship")).toBe(
      true
    );
  });
});
