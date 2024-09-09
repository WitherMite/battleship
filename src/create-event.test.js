import createEvent from "./create-event.js";

test("listeners must be functions", () => {
  const event = createEvent();
  expect(() => event.addListener("")).toThrow();
});

test("listeners run when event is sent", () => {
  const event = createEvent();
  const mock = jest.fn((i) => i);
  const mock2 = jest.fn((x) => x);
  event.addListener(mock);
  event.addListener(mock2);
  event.send();
  expect(mock).toHaveBeenCalled();
  expect(mock2).toHaveBeenCalled();
});

test("listeners are sent multi arg payloads", () => {
  const event = createEvent();
  const mock = jest.fn((i) => i);
  event.addListener(mock);
  event.send("hello", "world", 1, 2, 3);
  expect(mock).toHaveBeenCalledWith("hello", "world", 1, 2, 3);
});

test("listeners can be removed", () => {
  const event = createEvent();
  const mock = jest.fn((i) => i);
  event.addListener(mock);
  event.removeListener(mock);
  event.send();
  expect(mock).not.toHaveBeenCalled();
});
