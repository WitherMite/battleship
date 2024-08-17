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
    const emptyTile = { ship: null, isHit: false };
    const emptyBoard = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => emptyTile)
    );
    expect(board.getState()).toEqual(emptyBoard);
  });
});
