import createPlayer from "./create-player.js";

describe("Uses injected input to pass actions", () => {
  const input = {
    povType: "hello",
    attack() {
      return [0, 0];
    },
  };
  const player = createPlayer(input);
  test("Passes input's attack", () => {
    expect(player.attack()).toEqual([0, 0]);
  });
  test("Passes input's povType", () => {
    expect(player.povType).toBe("hello");
  });
});

describe("Provides a radar version of its board", () => {
  let player;
  beforeEach(() => {
    player = createPlayer();
    // player.board.placeShip([4, 2], "right", "carrier");
    // player.board.placeShip([4, 4], "up", "battleship");
    // player.board.placeShip([8, 5], "down", "destroyer");
    // player.board.placeShip([2, 3], "left", "submarine");
    // player.board.placeShip([0, 8], "right", "patrol");
  });

  test("Same size as its board", () => {
    const board = player.board.getState();
    const radar = player.getRadar();
    let isSameSize = board.length === radar.length;
    if (isSameSize) {
      for (let i = 0; i < board.length; i++) {
        isSameSize = board[i].length === radar[i].length;
        if (!isSameSize) break;
      }
    }
    expect(isSameSize).toBe(true);
  });
  test("Does not contain floating ships", () => {
    const radar = player.getRadar();
    let hasFloatingShips = false;
    radar.forEach((col) => {
      col.forEach(
        (tile) => (hasFloatingShips = !!tile?.ship && !tile?.ship.isSunk)
      );
    });
    expect(hasFloatingShips).toBe(false);
  });
  test("Same hits/misses as its board", () => {
    player.board.receiveAttack([5, 6]);
    player.board.receiveAttack([4, 6]);
    player.board.receiveAttack([2, 5]);

    const board = player.board.getState();
    const radar = player.getRadar();
    let hasSameShots = true;
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        hasSameShots = board[x][y].shot?.isHit === radar[x][y].shot?.isHit;
        if (!hasSameShots) break;
      }
      if (!hasSameShots) break;
    }
    expect(hasSameShots).toBe(true);
  });
});
