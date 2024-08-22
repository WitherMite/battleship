import createShip from "./create-ship.js";

describe("Create valid ship objects", () => {
  const ship = createShip("battleship");
  test("Has correct initial hits", () => {
    expect(ship.hits).toBe(0);
  });
  test("Starts not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });
  test("Errors when passed invalid ship type", () => {
    expect(() => createShip("dstoyr")).toThrow();
  });
});

describe("Creates different types of boats", () => {
  test.each([
    ["carrier", 5],
    ["battleship", 4],
    ["destroyer", 3],
    ["submarine", 3],
    ["patrol", 2],
  ])("Creates %s", (name, len) => {
    const ship = createShip(name);
    expect(ship.length).toBe(len);
    expect(ship.name).toBe(name);
  });
});

describe("Ships can be hit", () => {
  const ship = createShip("battleship");
  const isHit = ship.hit();

  test("Ship tracks hits", () => {
    ship.hit();
    expect(ship.hits).toBe(2);
  });
  test("Returns true when hit", () => {
    expect(isHit).toBe(true);
  });
});

describe("Ships are sunk when hits equal length", () => {
  const patrol = createShip("patrol");
  const carrier = createShip("carrier");
  test("Sink patrol", () => {
    patrol.hit();
    patrol.hit();
    expect(patrol.isSunk()).toBe(true);
  });
  test("Fail to sink carrier", () => {
    carrier.hit();
    carrier.hit();
    expect(carrier.isSunk()).toBe(false);
  });
  test("Sink carrier", () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.isSunk()).toBe(true);
  });
});
