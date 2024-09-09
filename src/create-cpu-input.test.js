import createCPUInput from "./create-cpu-input.js";

describe("Returns a valid input object for players", () => {
  // having a smaller board shouldn't affect these tests
  const boardSize = 5;
  const cpu = createCPUInput(boardSize);

  test('Has povType set to "computer"', () => {
    expect(cpu.povType).toBe("computer");
  });

  test("Attack method returns a valid gameboard coordinate", async () => {
    function areValidCoordinates(coords) {
      return (
        Array.isArray(coords) &&
        coords.length === 2 &&
        coords.every(
          (n) => typeof n === "number" && n >= 0 && n < boardSize && n % 1 === 0
        )
      );
    }
    const attack = await cpu.attack();
    expect(areValidCoordinates(attack)).toBe(true);
  });

  test("Attack method will never return any repeat coordinates", async () => {
    const cpu2 = createCPUInput(boardSize, () => 0);
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
