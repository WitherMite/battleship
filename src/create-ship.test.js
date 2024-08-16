import createShip from "./create-ship.js";

describe("Create valid ship objects", () => {
  const ship = createShip(4);
  test("Has correct length", () => {
    expect(ship.length).toBe(4);
  });
  test("Has correct initial hits", () => {
    expect(ship.hits).toBe(0);
  });
  test("Starts not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });

  const ship2 = createShip(2);
  const ship3 = createShip(5);
  test("Length is customizable", () => {
    expect(ship2.length).toBe(2);
    expect(ship3.length).toBe(5);
  });
});

describe("Ships can be sunk", () => {
  const patrol = createShip(2);
  const carrier = createShip(5);
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
