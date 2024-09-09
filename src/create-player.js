import createGameboard from "./create-gameboard.js";

export default function createPlayer(input = {}) {
  const board = createGameboard();

  return {
    board,
    getRadar() {
      const boardState = board.getState();
      const radar = boardState.map((col) =>
        col.map((tile) => {
          if (!tile.ship?.isSunk) tile.ship = null;
          return tile;
        })
      );
      return radar;
    },
    ...input,
  };
}
