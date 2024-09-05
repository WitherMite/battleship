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
