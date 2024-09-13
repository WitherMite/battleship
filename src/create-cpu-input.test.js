import createCPUInput from "./create-cpu-input.js";

function areValidCoordinates(coords, boardSize) {
  return (
    Array.isArray(coords) &&
    coords.length === 2 &&
    coords.every(
      (n) => typeof n === "number" && n >= 0 && n < boardSize && n % 1 === 0
    )
  );
}

describe("Returns a valid input object for players", () => {
  // having a smaller board shouldn't affect these tests
  const boardSize = 5;
  const cpu = createCPUInput(boardSize);

  test('Has povType set to "computer"', () => {
    expect(cpu.povType).toBe("computer");
  });

  test("Attack method returns a valid gameboard coordinate", async () => {
    const attack = await cpu.attack();
    expect(areValidCoordinates(attack, boardSize)).toBe(true);
  });

  test("Attack method will never return any repeat coordinates", async () => {
    const cpu2 = createCPUInput(boardSize, async () => {});
    const exampleAtk = await cpu2.attack();

    function areEqualNumArrays(arr1, arr2) {
      return (
        arr1.length === arr2.length &&
        arr1.every((n, i) => {
          n === arr2[i];
        })
      );
    }

    let hasRepeated = false;
    for (let i = 0; i < boardSize ** 2 - 1; i++) {
      hasRepeated = areEqualNumArrays(await cpu2.attack(), exampleAtk);
      if (hasRepeated) break;
    }
    expect(hasRepeated).toBe(false);
  });
});

describe("Tells board property of objects its composed with to place all ships", () => {
  const boardSize = 10;
  const directions = ["up", "down", "left", "right"];
  const ships = ["carrier", "battleship", "destroyer", "submarine", "patrol"];

  const playerMock = {
    board: {
      getUnplacedShips: () => ships,
    },
    ...createCPUInput(boardSize, async () => {}),
  };

  let mockFn;
  beforeEach(() => {
    playerMock.board.placeShip = jest.fn((c, d, ship) => ship);
    mockFn = playerMock.board.placeShip;
  });

  test("Only sends valid arguments", () => {
    playerMock.placeShips();
    mockFn.mock.calls.forEach((call) => {
      expect(areValidCoordinates(call[0], boardSize)).toBe(true);
      expect(directions).toContain(call[1]);
      expect(ships).toContain(call[2]);
    });
  });
  test("Called at least once for each unplaced ship", () => {
    playerMock.placeShips();
    expect(mockFn.mock.calls.length).toBeGreaterThanOrEqual(ships.length);
  });

  describe("Tries again only when board throws an expected error", () => {
    test.each([["Ship out of bounds"], ["Ship would overlap another boat"]])(
      "Tries again for %s",
      (expectedMsg) => {
        mockFn.mockImplementationOnce(() => {
          throw new Error(expectedMsg);
        });
        playerMock.placeShips();
        expect(mockFn).toHaveBeenCalledTimes(ships.length + 1);
        ships.forEach((ship, i) =>
          expect(mockFn.mock.results[i + 1].value).toBe(ship)
        );
      }
    );
    test.each([
      ["Ship already placed", "shipname"],
      ["Invalid coordinate pair", [1, 2, 3]],
      ["Some unexpected err", "foo"],
    ])("Rethrows %s", (errMsg, cause) => {
      mockFn.mockImplementationOnce(() => {
        throw new Error(errMsg, { cause });
      });

      expect(() => {
        playerMock.placeShips();
      }).toThrow(new Error(errMsg, { cause }));
    });
  });
});
