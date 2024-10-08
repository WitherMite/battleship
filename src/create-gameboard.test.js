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
      .every((tile) => tile.ship === null && !tile.shot);
    expect(hasValidTiles).toBe(true);
  });

  test("Methods only accept valid coordinate pairs", () => {
    expect(() => board.placeShip([10, 1], "right", "battleship")).toThrow();
    expect(() => board.placeShip([-1, 1], "up", "carrier")).toThrow();
    expect(() => board.receiveAttack([4, 12])).toThrow();
    expect(() => board.receiveAttack(["a", 1])).toThrow();
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

  test("Ships cannot be partially off the board", () => {
    expect(() => board.placeShip([1, 8], "up", "destroyer")).toThrow();
    expect(() => board.placeShip([8, 1], "down", "submarine")).toThrow();
    expect(() => board.placeShip([1, 1], "left", "carrier")).toThrow();
    expect(() => board.placeShip([8, 8], "right", "battleship")).toThrow();
  });

  test("Ships cannot share tiles", () => {
    board.placeShip([6, 7], "left", "carrier");
    expect(() => board.placeShip([1, 7], "right", "battleship")).toThrow();
  });

  test("Can only place one of each ship type", () => {
    board.placeShip([6, 7], "left", "carrier");
    expect(() => board.placeShip([4, 2], "right", "carrier")).toThrow();
  });

  describe("Provides a list of unplaced ship type strings", () => {
    const ships = ["carrier", "battleship", "destroyer", "submarine", "patrol"];
    ships.forEach((ship) =>
      test(`List contains ${ship}`, () => {
        expect(board.getUnplacedShips()).toContain(ship);
      })
    );

    test("Placed ships are not in list", () => {
      board.placeShip([6, 7], "left", "carrier");
      expect(board.getUnplacedShips()).not.toContain("carrier");
    });
  });
});

describe("Gameboards can recieve attacks", () => {
  const board = createGameboard();
  board.placeShip([4, 2], "right", "carrier");
  board.placeShip([4, 4], "up", "battleship");
  board.placeShip([8, 5], "down", "destroyer");
  board.placeShip([2, 3], "left", "submarine");
  board.placeShip([0, 8], "right", "patrol");

  test.each([
    [0, 0],
    [9, 3],
    [4, 1],
  ])("Attack [%s,%s] and miss", (x, y) => {
    board.receiveAttack([x, y]);
    const boardState = board.getState();
    const isSuccessfulMiss = boardState[x][y].shot.isHit === false;
    expect(isSuccessfulMiss).toBe(true);
  });
  test.each([
    [4, 2],
    [8, 2],
    [5, 2],
  ])("Attack [%s,%s] and hit", (x, y) => {
    board.receiveAttack([x, y]);
    const boardState = board.getState();
    const isSuccessfulHit = boardState[x][y].shot.isHit;
    expect(isSuccessfulHit).toBe(true);
  });
  test("Boards' ships sink", () => {
    board.receiveAttack([6, 2]);
    board.receiveAttack([7, 2]);
    const boardState = board.getState();
    expect(boardState[7][2].ship.isSunk).toBe(true);
  });
  test("Cannot attack the same tile more than once", () => {
    expect(() => board.receiveAttack([0, 0])).toThrow();
  });
  test("Only full boards can be attacked", () => {
    const board2 = createGameboard();
    board2.placeShip([4, 2], "right", "carrier");
    expect(() => board2.receiveAttack([4, 3])).toThrow();
  });
});

describe("Gameboards report losses", () => {
  const board = createGameboard();
  board.placeShip([4, 2], "right", "carrier");
  board.placeShip([4, 4], "up", "battleship");
  board.placeShip([8, 5], "down", "destroyer");
  board.placeShip([2, 3], "left", "submarine");
  board.placeShip([0, 8], "right", "patrol");

  const attack = (xy) => board.receiveAttack(xy);
  /* prettier-ignore */ {
  [[4,2],[5,2],[6,2],[7,2],[8,2]].forEach(attack);
  [[4,4],[4,5],[4,6],[4,7]].forEach(attack);
  [[8,5],[8,4],[8,3]].forEach(attack);
  [[2,3],[1,3],[0,3]].forEach(attack);
  [[0,8],[1,8]].forEach(attack);
  }

  test("Lose.", () => {
    expect(board.isDefeat).toBe(true);
  });
});
