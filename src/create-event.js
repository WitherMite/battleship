export default function createEvent() {
  const listeners = [];
  return {
    addListener(fn) {
      if (typeof fn !== "function")
        throw new Error("Listeners must be valid functions");
      listeners.push(fn);
    },
    removeListener(fn) {
      const fnIndex = listeners.findIndex((listener) => listener === fn);
      listeners.splice(fnIndex, 1);
    },
    send(...payload) {
      listeners.forEach((fn) => fn(...payload));
    },
  };
}
